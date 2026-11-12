---
layout: page
title: "Standards & Frameworks"
permalink: /frameworks/
description: "The government and industry standards P-SSCRM was built from, and which P-SSCRM controls cite each one."
---

P-SSCRM was built by combining the government and industry standards listed below.
Every P-SSCRM control draws on at least one of them, so following P-SSCRM also
keeps you in line with these standards.

{% assign fw_order = "eo,800-161,ssdf,ssdf-ai,self-attestation,slsa,bsimm,cncf-ssc,ossf-scorecard,owasp-scvs" | split: "," %}
<ul class="framework-index">
  {% for key in fw_order %}
    {% assign fw = site.data.frameworks[key] %}
    {% if fw %}
      <li id="{{ key }}">
        <h2>{% if fw.url %}<a href="{{ fw.url }}" target="_blank" rel="noopener">{{ fw.name }}</a>{% else %}{{ fw.name }}{% endif %}</h2>
        <p title="{{ fw.full_name }}">{{ fw.full_name }}</p>
      </li>
    {% endif %}
  {% endfor %}
</ul>

## Control coverage by group and standard

Each row is one standard. Each cell shows how many of a group's controls draw on
that standard, written as "13 of 23", with a bar that fills to match. The bar uses
the group's color, so a fuller bar means the standard covers more of that group.
A **★ unique** line means that many of those controls are cited by this standard
alone, so dropping it would leave them uncovered. **Overall coverage** is the same
count across all P-SSCRM controls. **Click any number** to list the controls behind it.

{% assign count_groups = site.groups | where_exp: "g", "g.slug != 'u'" | sort: "weight" %}
{% assign all_total = 0 %}{% assign gt = "" %}
{% for g in count_groups %}{% assign gn = 0 %}{% assign gp = site.practices | where: "group", g.slug %}{% for p in gp %}{% assign pc = site.controls | where: "practice", p.slug %}{% assign gn = gn | plus: pc.size %}{% endfor %}{% assign all_total = all_total | plus: gn %}{% assign gt = gt | append: gn | append: "," %}{% endfor %}
{% assign gt_arr = gt | split: "," %}
<div class="counts-table-wrap">
  <table class="counts-table" id="counts-table">
    <caption class="visually-hidden">For each standard, how many P-SSCRM controls in each group draw on it, how many of those only that standard cites, and the overall coverage across all {{ all_total }} controls. Each number can be opened to list the controls.</caption>
    <thead>
      <tr>
        <th scope="col">Standard</th>
        {% for g in count_groups %}<th scope="col" class="counts-num counts-g-{{ g.slug }}"><span class="counts-head-name">{{ g.title }}</span> <span class="counts-head-sub">{{ gt_arr[forloop.index0] }} controls</span></th>{% endfor %}
        <th scope="col" class="counts-total-head"><span class="counts-head-name">Overall coverage</span> <span class="counts-head-sub">of all {{ all_total }} controls</span></th>
      </tr>
    </thead>
    <tbody>
      {% for key in fw_order %}{% assign fw = site.data.frameworks[key] %}{% if fw %}
      {% assign tot_n = 0 %}{% assign tot_u = 0 %}{% assign all_chips = "" %}
      <tr class="counts-row">
        <th scope="row"><a href="#{{ key }}" title="{{ fw.full_name }}">{{ fw.name }}</a></th>
        {% for g in count_groups %}
          {% assign n = 0 %}{% assign u = 0 %}{% assign chips = "" %}
          {% assign gn = gt_arr[forloop.index0] | plus: 0 %}
          {% assign gp = site.practices | where: "group", g.slug | sort: "weight" %}
          {% for p in gp %}{% assign pc = site.controls | where: "practice", p.slug | sort: "weight" %}
            {% for c in pc %}{% if c.frameworks[key] %}
              {% assign n = n | plus: 1 %}
              {% capture chip %}<a class="counts-chip counts-g-{{ g.slug }}{% if c.frameworks.size == 1 %} is-unique{% endif %}" href="{{ "/framework/" | relative_url }}#{{ c.slug }}" title="{{ c.title | escape }}{% if c.frameworks.size == 1 %} (only {{ fw.name }} cites this){% endif %}">{% if c.frameworks.size == 1 %}&#9733; {% endif %}{{ c.code }}</a>{% endcapture %}
              {% assign chips = chips | append: chip %}
              {% if c.frameworks.size == 1 %}{% assign u = u | plus: 1 %}{% endif %}
            {% endif %}{% endfor %}
          {% endfor %}
          {% assign tot_n = tot_n | plus: n %}{% assign tot_u = tot_u | plus: u %}{% assign all_chips = all_chips | append: chips %}
          {% assign pct = 0 %}{% if gn > 0 %}{% assign pct = n | times: 100 | divided_by: gn %}{% endif %}
          <td class="counts-num counts-cell counts-g-{{ g.slug }}{% if n == 0 %} is-zero{% endif %}">
            {% if n > 0 %}<button type="button" class="counts-btn" aria-expanded="false" data-label="{{ fw.name }} covers {{ n }} of {{ gn }} {{ g.title }} controls" title="{{ fw.name }} covers {{ n }} of {{ gn }} {{ g.title }} controls ({{ pct }}%){% if u > 0 %}; {{ u }} of them are cited by no other standard{% endif %}">{% else %}<span class="counts-btn" title="{{ fw.name }} covers none of the {{ gn }} {{ g.title }} controls">{% endif %}
              <span class="counts-n">{{ n }}</span><span class="counts-of-group"> of {{ gn }}</span>
              <span class="counts-cell-bar" aria-hidden="true"><span style="width: {{ pct }}%;"></span></span>
              <span class="counts-uniq">{% if u > 0 %}&#9733; {{ u }} unique{% else %}&nbsp;{% endif %}</span>
            {% if n > 0 %}</button><div class="counts-list" hidden>{{ chips }}</div>{% else %}</span>{% endif %}
          </td>
        {% endfor %}
        {% assign tot_pct = 0 %}{% if all_total > 0 %}{% assign tot_pct = tot_n | times: 100 | divided_by: all_total %}{% endif %}
        <td class="counts-total counts-cell counts-g-all">
          <button type="button" class="counts-btn" aria-expanded="false" data-label="{{ fw.name }} covers {{ tot_n }} of {{ all_total }} P-SSCRM controls" title="{{ fw.name }} covers {{ tot_n }} of {{ all_total }} P-SSCRM controls ({{ tot_pct }}%){% if tot_u > 0 %}; {{ tot_u }} of them are cited by no other standard{% endif %}">
            <span class="counts-total-line"><strong>{{ tot_n }}</strong> of {{ all_total }} <span class="counts-pct">{{ tot_pct }}%</span></span>
            <span class="counts-bar" aria-hidden="true"><span style="width: {{ tot_pct }}%;"></span></span>
            <span class="counts-uniq">{% if tot_u > 0 %}&#9733; {{ tot_u }} unique{% else %}&nbsp;{% endif %}</span>
          </button>
          <div class="counts-list" hidden>{{ all_chips }}</div>
        </td>
      </tr>
      {% endif %}{% endfor %}
    </tbody>
  </table>
</div>
<script src="{{ "/static/js/counts-detail.js" | relative_url }}?v={{ site.time | date: '%s' }}" defer></script>

## Which controls cite each standard

Click a standard to see the P-SSCRM controls that draw on it. Each control
links to its full description on [The Framework]({{ "/framework/" | relative_url }}).
Use the search box to find a specific control or topic.

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
