---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
---


The Proactive Software Supply Chain Risk Management Framework (P-SSCRM) described here is designed to help you understand and plan a secure software supply chain risk management initiative. P-SSCRM was created through a process of understanding and analyzing real world data from nine industry leading software supply chain risk management initiatives as well as through the analysis and unification of ten government and industry documents, frameworks, and standards. Although individual methodologies and standards differ, many initiatives and standards share common ground. P-SSCRM describes this common ground and presents a model for understanding, quantifying, and developing a secure software supply chain risk management program and determining where your organization's existing efforts stand when contrasted with other real world software supply chain risk management initiatives.

<table border="2px">
    {% for group in site.data.framework.groups %}
        {% assign gidslug = group.id | downcase %}
            <th>
                <a href="{{ '/framework/groups/' | append: gidslug | relative_url }}">{{ group.name }}</a>
            </th>
     {% endfor %}
    <tr>
    {% for group in site.data.framework.groups %}
        {% assign gidslug = group.id | slugify %}
            <td>
                {% for practice in group.practices %}
                    {% assign pidslug = practice.id | slugify %}
                    <li>
                        <a href="{{ '/framework/practices/' | append: pidslug | relative_url }}">{{ practice.name }}</a>
                    </li>
                {% endfor %}
            </td>
     {% endfor %}
     </tr>
</table>



