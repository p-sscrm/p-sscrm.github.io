---
layout: default
---
<br>
<p>
Roles played by users of the P-SSCRM controls, with links to the specific controls used by each role.
<br>
<ul>
    {% for role in site.data.framework.roles %}
        <li>
            <a href="{{ role.link }}">{{ role.title }}</a>
            <a href="/framework/roles/{{ role.id | slugify }}"> (controls)</a>
        </li>
    {% endfor %}
</ul>
<p>