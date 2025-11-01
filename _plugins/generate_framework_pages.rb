require 'json'

module Framework
  class Generator < Jekyll::Generator
    def generate(site)
      # Load framework data
      framework = JSON.parse(File.read('_data/framework.json'))

      # generate top-level framework page
#      site.collections.docs << create_doc(site,'_framework',"framework2.md",{})
#      site.collections['groups'].docs << create_doc(
#        site, '_groups',
#        "#{group['id']}.md",
#        {
#          'title' => group['name'],
#          'group_id' => group['id'],
#          'description' => group['description']
#        }
#      )

      # Generate a page for each framework
      framework['metadata'].each do |fwk|
        site.collections['frameworks'].docs << create_doc(
          site, '_frameworks',
         "#{fwk['id']}.md",
          {
            'title' => fwk['title'],
            'framework_id' => fwk['id'],
            'description' =>  fwk['description'],
            'link' => fwk['link'],
          }
        )
      end
 
      # Generate pages for each group
      framework['groups'].each do |group|
        site.collections['groups'].docs << create_doc(
          site, '_groups',
          "#{group['id']}.md",
          {
            'title' => group['name'],
            'group_id' => group['id'],
            'description' => group['description']
          }
        )
        
        # Generate pages for each practice
        group['practices'].each do |practice|
          site.collections['practices'].docs << create_doc(
            site, '_practices',
            "#{practice['id']}.md",
            {
              'title' => practice['name'],
              'practice_id' => practice['id'],
              'group_id' => group['id'],
              'description' => practice['description']
            }
          )
          
          # Generate pages for each task
          practice['tasks'].each do |task|
            site.collections['tasks'].docs << create_doc(
              site, '_tasks',
              "#{task['id']}.md",
              {
                'title' => task['name'],
                'task_id' => task['id'],
                'practice_id' => practice['id'],
                'group_id' => group['id'],
                'definition' => task['definition'],
                'objective' => task['objective'],
                'questions' => task['questions']
              }
            )
          end
        end
      end
      # get, write task counts 
      counts = summarize_tasks_by_practice_and_framework(framework)
      site.data['taskcount2'] = JSON.pretty_generate(counts)
      #create_doc(site, '_data', 'taskcounts2.json',JSON.pretty_generate(counts))
    end
    
    private
    
    def create_doc2(site, collection_name, path, data)
      doc = Jekyll::Document.new(
        File.join(site.source, collection_name, path),
        site: site,
        collection: site.collections[collection_name.sub(/^_/, '')]
      )
      doc.merge_data!(data)
      doc
    end

    def create_doc(site, collection_name, path, data)
      doc = Jekyll::Document.new(
        File.join(site.source, collection_name, path),
        site: site,
        collection: site.collections[collection_name.sub(/^_/, '')]
      )
      doc.merge_data!(data)
      doc
    end

    def summarize_tasks_by_practice_and_framework(data)
      practice_map = {}

      (data['groups'] || []).each do |group|
        (group['practices'] || []).each do |practice|
          practice_id = practice['id']
          next unless practice_id

          practice_name = practice['name'] || ''
          entry = practice_map[practice_id] ||= { name: practice_name, counts: Hash.new(0) }
          entry[:name] = practice_name if entry[:name].to_s.empty? && !practice_name.to_s.empty?

          (practice['tasks'] || []).each do |task|
            frameworks = Set.new
            (task['references'] || []).each do |ref|
              if ref.is_a?(Hash)
                source = ref['source']
                if source
                  if source.is_a?(String)
                    frameworks.add(source) unless source.empty?
                  else
                    frameworks.add(source)
                  end
                end
              end
            end
            frameworks.each { |fw| entry[:counts][fw] += 1 }
          end
        end
      end

      practices_out = practice_map
        .map do |pid, info|
          frameworks_out = info[:counts]
            .sort_by { |fw, _| fw }
            .map { |fw, cnt| { 'name' => fw, 'count' => cnt } }

          { 'id' => pid, 'name' => info[:name], 'frameworks' => frameworks_out }
        end

      { 'practices' => practices_out }
    end

  end
end 
