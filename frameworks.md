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

Each row is one standard. Each number is how many P-SSCRM controls draw on that
standard, split by Practice Group (the four columns). **The stronger the color, the more
of that group the standard covers.** The last column shows the share of all
P-SSCRM controls the standard covers. A number in brackets, such as
<span class="counts-unique">[5]</span>, is how many of those controls cite this standard
and no other. The rest are also cited by at least one other standard.

{% assign count_groups = site.groups | where_exp: "g", "g.slug != 'u'" | sort: "weight" %}
{% assign all_total = 0 %}
{% for g in count_groups %}{% assign gp = site.practices | where: "group", g.slug %}{% for p in gp %}{% assign pc = site.controls | where: "practice", p.slug %}{% assign all_total = all_total | plus: pc.size %}{% endfor %}{% endfor %}
<div class="counts-table-wrap">
  <table class="counts-table">
    <caption class="visually-hidden">Number of P-SSCRM controls per practice group that draw on each standard, shaded by the share of the group covered, plus overall coverage and how many controls come from that standard alone</caption>
    <thead>
      <tr>
        <th scope="col">Standard</th>
        {% for g in count_groups %}<th scope="col" class="counts-num counts-g-{{ g.slug }}">{{ g.title }}</th>{% endfor %}
        <th scope="col" class="counts-total-head">Overall coverage</th>
      </tr>
    </thead>
    <tbody>
      <tr class="counts-row counts-pssrm">
        <th scope="row"><a href="{{ "/framework/" | relative_url }}">P-SSCRM</a></th>
        {% for g in count_groups %}
          {% assign gn = 0 %}
          {% assign gp = site.practices | where: "group", g.slug %}
          {% for p in gp %}{% assign pc = site.controls | where: "practice", p.slug %}{% assign gn = gn | plus: pc.size %}{% endfor %}
          <td class="counts-num">{{ gn }}</td>
        {% endfor %}
        <td class="counts-total">{{ all_total }} controls in total</td>
      </tr>
      {% for key in fw_order %}{% assign fw = site.data.frameworks[key] %}{% if fw %}
      {% assign tot_n = 0 %}{% assign tot_u = 0 %}
      <tr class="counts-row">
        <th scope="row"><a href="#{{ key }}" title="{{ fw.full_name }}">{{ fw.name }}</a></th>
        {% for g in count_groups %}
          {% assign n = 0 %}{% assign u = 0 %}{% assign gn = 0 %}
          {% assign gp = site.practices | where: "group", g.slug %}
          {% for p in gp %}{% assign pc = site.controls | where: "practice", p.slug %}
            {% assign gn = gn | plus: pc.size %}
            {% for c in pc %}{% if c.frameworks[key] %}{% assign n = n | plus: 1 %}{% if c.frameworks.size == 1 %}{% assign u = u | plus: 1 %}{% endif %}{% endif %}{% endfor %}
          {% endfor %}
          {% assign tot_n = tot_n | plus: n %}{% assign tot_u = tot_u | plus: u %}
          {% assign pct = 0 %}{% if gn > 0 %}{% assign pct = n | times: 100 | divided_by: gn %}{% endif %}
          <td class="counts-num counts-cell" data-level="{% if n == 0 %}0{% else %}{{ pct | plus: 19 | divided_by: 20 }}{% endif %}" title="{{ fw.name }} covers {{ n }} of {{ gn }} {{ g.title }} controls ({{ pct }}%){% if u > 0 %}; {{ u }} of them are covered by no other standard{% endif %}">
            {{ n }}{% if u > 0 %} <span class="counts-unique">[{{ u }}]</span>{% endif %}
          </td>
        {% endfor %}
        {% assign tot_pct = 0 %}{% if all_total > 0 %}{% assign tot_pct = tot_n | times: 100 | divided_by: all_total %}{% endif %}
        <td class="counts-total" title="{{ fw.name }} covers {{ tot_n }} of {{ all_total }} P-SSCRM controls{% if tot_u > 0 %}; {{ tot_u }} of them are covered by no other standard{% endif %}">
          <span class="counts-meter">
            <span class="counts-pct">{{ tot_pct }}%</span>
            <span class="counts-bar" aria-hidden="true"><span style="width: {{ tot_pct }}%;"></span></span>
            <span class="counts-of">{{ tot_n }} of {{ all_total }}</span>
          </span>
        </td>
      </tr>
      {% endif %}{% endfor %}
    </tbody>
  </table>
</div>
<div class="counts-legend" aria-hidden="true">
  <span>Covers fewer of the group</span>
  <span class="counts-legend-scale"><i data-level="1"></i><i data-level="2"></i><i data-level="3"></i><i data-level="4"></i><i data-level="5"></i></span>
  <span>Covers more of the group</span>
</div>

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
