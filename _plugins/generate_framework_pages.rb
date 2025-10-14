require 'json'

module Framework
  class Generator < Jekyll::Generator
    def generate(site)
      # Load framework data
      framework = JSON.parse(File.read('_data/framework.json'))

      # generate top-level framework page
#      site.collections.docs << create_doc(site,'_framework',"framework.md",{})
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
  end
end 
