---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
---
### Introduction
The Proactive Software Supply Chain Risk Management Framework (P-SSCRM) described here is designed to help you understand and plan a secure software supply chain risk management initiative. P-SSCRM was created through a process of understanding and analyzing real world data from nine industry leading software supply chain risk management initiatives as well as through the analysis and unification of ten government and industry documents, frameworks, and standards. Although individual methodologies and standards differ, many initiatives and standards share common ground. P-SSCRM describes this common ground and presents a model for understanding, quantifying, and developing a secure software supply chain risk management program and determining where your organization's existing efforts stand when contrasted with other real world software supply chain risk management initiatives.
<br>
<br>
The table below shows the structure of the Proactive Supply Chain Risk Management (P-SSCRM)
Framework. It includes four broad groups of Governance, Product, Environment, and Deployment.
Our P-SSCRM as well as both practice and task descriptions, provide a common vocabulary for
explaining the salient elements of an SSCRM-I. Within the four P-SSCRM groups are 15 practices
(e.g., Perform compliance). P-SSCRM is composed of 74
Software supply chain risk management tasks are organized into these 15 practices.
<br>
<br>
<table border="2px">
    {% for group in site.data.framework.groups %}
        {% assign gidslug = group.id | downcase %}
            <th>
                <a href="{{ '/framework/groups/' | append: gidslug | relative_url }}">{{ group.name }}</a>
            </th>
     {% endfor %}
    <tr>
    <!-- TO DO: The blurbs really ought to be in the metadata and pulled like the group names are above -->
    <td>The Governance Group contains five practices made up of tasks that focus on the organization and measurement of a secure software supply chain and on policies for decision making, accountability to third-party organizations, and on remaining compliant with legal and regulatory requirements.</td>
    <td>The Product Group contains five practices made up of tasks to lead to the deployment of a secure product with minimal vulnerabilities with associated required attestations and artifacts.</td>
    <td>The Environment Group contains three practices made up of tasks to protect the confidentiality and integrity of source code, software components, and the build infrastructure from tampering and unauthorized access.</td>
    <td>The Deployment Group contains two practices made up of tasks for identifying, analyzing, and addressing vulnerabilities in products.</td>
    </tr>
    <tr>
    {% for group in site.data.framework.groups %}
        {% assign gidslug = group.id | slugify %}
            <td>
                {% for practice in group.practices %}
                    {% assign pidslug = practice.id | slugify %}
                    {% assign pid = practice.id | append: " " %}
                        <a href="{{ '/framework/practices/' | append: pidslug | relative_url }}">{{ pid | append: practice.name }}</a>
                        <br>
                {% endfor %}
            </td>
     {% endfor %}
     </tr>
</table>
<br>

### WHERE DID THE P_SSCRM COME FROM?

The Proactive Software Supply Chain Risk Management (P-SSCRM) Framework results from a
unique study of real-world software supply chain risk management initiatives and the union of the
tasks in ten government and industry documents (standards and frameworks). Tasks in the P-SSCRM
are mapped to one or more of these standards and frameworks. We present the model as built
directly from these tasks and from data observed in real-world software supply chain risk
management initiatives from a diverse and global collection of firms through data collected in 2022
and 2023.
<br>
<br>
<p>
The frameworks used in the foundation and mapping of P-SSCRM tasks, with links to the mapping
references, are:
<br>
<ul>
    {% for fwk in site.data.framework.metadata %}
        <li>
            <a href="{{ fwk.link }}">{{ fwk.title }}</a>
        </li>
    {% endfor %}
</ul>
<p>
