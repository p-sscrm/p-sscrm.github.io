---
layout: post
title:  "What is P-SSCRM?"
date:   2025-10-14 14:37:27 -0400
categories: update
---


One thing the Proactive Software Supply Chain Risk Managementi (P-SSCRM) framework is not is another standard. Rather than introducing any new concepts, practices, or tasks, we have aggregated concepts, practices, and tasks from existing software supply chain security frameworks. 
![XKCD Standards](/assets/images/xkcd_927_standards_2x.png)
<p>P-SSCRM is designed to help you understand and plan a secure software supply chain risk management initiative. P-SSCRM was created through a process of understanding and analyzing real world data from nine industry leading software supply chain risk management initiatives as well as through the analysis and unification of ten government and industry documents, frameworks, and standards. Although individual methodologies and standards differ, many initiatives and standards share common ground. P-SSCRM describes this common ground and presents a model for understanding, quantifying, and developing a secure software supply chain risk management program and determining where your organization's existing efforts stand when contrasted with other real world software supply chain risk management initiatives.

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
                    {% assign pid = practice.id | append: " " %}
                        <a href="{{ '/framework/practices/' | append: pidslug | relative_url }}">{{ pid | append: practice.name }}</a>
                        <br>
                {% endfor %}
            </td>
     {% endfor %}
     </tr>
</table>
<p>
<p>
<table border="2px">
    <thead>
    <tr>
      <th>Practice</th>
      {% for fwk in site.data.framework.metadata %}
        {% assign gidslug = group.id | downcase %}
            <th>
                <a href="{{ '/framework/frameworks/' | append: fwk.id | relative_url }}">{{ fwk.id }}</a>
            </th>
      {% endfor %}
    </tr>
    </thead>
    <tbody>
    {% for group in site.data.framework.groups %}
      {% for practice in group.practices %}
        <tr>
        <td>{{ practice.id }} {{ practice.name }}
        {% for fwk in site.data.framework.metadata %}
          <td>
          {% assign fwk_task_total = 0 %}
          {% for task in practice.tasks %}
          {% endfor %}
          </td>
        {% endfor %}
      {% endfor %}
    {% endfor %}
    </tr>
    <tbody>
</table>
