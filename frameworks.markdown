---
layout: default
---
<br>
<p>
The frameworks used in the foundation and mapping of P-SSCRM controls, with links to the mapping
references, are:
<br>
<ul>
    {% for fwk in site.data.framework.metadata %}
        <li>
            <a href="{{ fwk.link }}">{{ fwk.title }}</a>
            <a href="/framework/frameworks/{{ fwk.id | slugify }}"> (controls)</a>
        </li>
    {% endfor %}
</ul>
<p>