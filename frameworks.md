---
layout: page
title: "Standards & Frameworks"
permalink: /frameworks/
description: "The government and industry standards P-SSCRM was built from, and which P-SSCRM controls cite each one."
---

P-SSCRM was assembled by analysing and unifying the government and industry
standards below. Every P-SSCRM control cites one or more of them, so aligning
with P-SSCRM keeps you aligned with these sources.

{% assign fw_order = "eo,800-161,ssdf,ssdf-ai,self-attestation,slsa,bsimm,cncf-ssc,ossf-scorecard,owasp-scvs" | split: "," %}
<ul class="framework-index">
  {% for key in fw_order %}
    {% assign fw = site.data.frameworks[key] %}
    {% if fw %}
      <li>
        <h2>{% if fw.url %}<a href="{{ fw.url }}" target="_blank" rel="noopener">{{ fw.name }}</a>{% else %}{{ fw.name }}{% endif %}</h2>
        <p title="{{ fw.full_name }}">{{ fw.full_name }}</p>
      </li>
    {% endif %}
  {% endfor %}
</ul>

## Which controls cite each standard

Expand a standard to see the P-SSCRM controls that map to it, grouped by
Practice; each links to its full entry on
[The Framework]({{ "/framework/" | relative_url }}). Search below to narrow
every standard down to the matching controls.

{% assign ordered_controls = "" | split: "" %}
{% assign _groups = site.groups | sort: "weight" %}
{% for g in _groups %}
  {% assign _practices = site.practices | where: "group", g.slug | sort: "weight" %}
  {% for p in _practices %}
    {% assign _cs = site.controls | where: "practice", p.slug | sort: "weight" %}
    {% assign ordered_controls = ordered_controls | concat: _cs %}
  {% endfor %}
{% endfor %}

{% include group-key.html %}

<div class="reverse-map-controls">
  <input type="search" id="reverse-map-filter" class="reverse-map-filter" placeholder="Search a control, e.g. G.1.1 or &ldquo;SBOM&rdquo;&hellip;" aria-controls="reverse-map">
  <button type="button" class="expand-all-btn" id="reverse-map-expand-all">Expand all</button>
  <button type="button" class="expand-all-btn" id="reverse-map-collapse-all">Collapse all</button>
</div>
<p class="reverse-map-empty" id="reverse-map-empty" hidden>No controls match that search.</p>

<div class="reverse-map" id="reverse-map">
  {% for key in fw_order %}
    {% assign fw = site.data.frameworks[key] %}
    {% if fw %}
      {% assign last_practice = "" %}
      {% assign g_count = 0 %}{% assign p_count = 0 %}{% assign e_count = 0 %}{% assign d_count = 0 %}
      {% for control in ordered_controls %}
        {% if control.frameworks[key] %}
          {% assign g0 = control.code | slice: 0 %}
          {% case g0 %}
            {% when "G" %}{% assign g_count = g_count | plus: 1 %}
            {% when "P" %}{% assign p_count = p_count | plus: 1 %}
            {% when "E" %}{% assign e_count = e_count | plus: 1 %}
            {% when "D" %}{% assign d_count = d_count | plus: 1 %}
          {% endcase %}
        {% endif %}
      {% endfor %}
      {% assign fw_total = g_count | plus: p_count | plus: e_count | plus: d_count %}
      <details>
        <summary>
          <span class="reverse-map-name">{{ fw.name }} <span class="reverse-map-full">{{ fw.full_name }}</span></span>
          <span class="reverse-map-ratio" title="{{ g_count }} Governance &middot; {{ p_count }} Product &middot; {{ e_count }} Environment &middot; {{ d_count }} Deployment">
            <span class="role-card-bar">
              {% if g_count > 0 %}<span class="role-card-seg role-seg-g" style="flex-grow: {{ g_count }};"></span>{% endif %}
              {% if p_count > 0 %}<span class="role-card-seg role-seg-p" style="flex-grow: {{ p_count }};"></span>{% endif %}
              {% if e_count > 0 %}<span class="role-card-seg role-seg-e" style="flex-grow: {{ e_count }};"></span>{% endif %}
              {% if d_count > 0 %}<span class="role-card-seg role-seg-d" style="flex-grow: {{ d_count }};"></span>{% endif %}
            </span>
            <span class="reverse-map-count">{{ fw_total }}</span>
          </span>
        </summary>
        <div class="reverse-map-body">
          {% for control in ordered_controls %}
            {% assign ref = control.frameworks[key] %}
            {% if ref %}
              {% if control.practice != last_practice %}
                {% assign practice = site.practices | where: "slug", control.practice | first %}
                <p class="reverse-map-practice fw-group-{{ practice.group }}"><span class="code-badge">{{ practice.code }}</span> {{ practice.title }}</p>
                {% assign last_practice = control.practice %}
              {% endif %}
              <a class="reverse-map-item" href="{{ "/framework/" | relative_url }}#{{ control.slug }}" data-code="{{ control.code | downcase }}" data-title="{{ control.title | downcase }}" data-ref="{{ ref | downcase }}">{{ control.code }} &mdash; {{ control.title }} <span class="mapping-ref">{{ ref }}</span></a>
            {% endif %}
          {% endfor %}
        </div>
      </details>
    {% endif %}
  {% endfor %}
</div>
<script src="{{ "/static/js/reverse-map-filter.js" | relative_url }}?v={{ site.time | date: '%s' }}" defer></script>

{% if site.data.frameworks_pending and site.data.frameworks_pending.size > 0 %}
## Standards being added

<ul>
  {% for item in site.data.frameworks_pending %}<li>{% if item.link %}<a href="{{ item.link }}" target="_blank" rel="noopener">{{ item.title }}</a>{% else %}{{ item.title }}{% endif %}</li>{% endfor %}
</ul>
{% endif %}
