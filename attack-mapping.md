---
layout: page
title: "ATT&CK Mapping"
permalink: /attack-mapping/
description: "How P-SSCRM controls are mapped to the MITRE ATT&CK techniques they mitigate, and to the standards those techniques connect to."
---

Each P-SSCRM control is mapped to the [MITRE ATT&amp;CK](https://attack.mitre.org/){:target="_blank" rel="noopener"}
technique(s) it mitigates. Because every control is already cross-referenced to the
government and industry standards on [Standards & Frameworks]({{ "/frameworks/" | relative_url }}),
this mapping also connects ATT&CK techniques to those ten standards
&mdash; SSDF, SLSA, BSIMM, NIST 800-161, and the rest &mdash; through P-SSCRM.

The mapping is described in *Your ATs to Ts: MITRE ATT&amp;CK Attack Technique to
P-SSCRM Task Mapping* (Hamer, Bowen, Haque, Wroblewski, Madden, and Williams),
available at
[arxiv.org/abs/2507.18037](https://arxiv.org/abs/2507.18037){:target="_blank" rel="noopener"}.
It builds on the gaps identified in
[*Closing the Chain*]({{ "/news/2026/09/23/closing-the-chain/" | relative_url }}),
which analyzed the SolarWinds, Log4j, and XZ Utils attacks against ten existing
security frameworks to find where those frameworks fall short.

## How the mapping was developed

The mapping team worked from the ATT&CK techniques observed or plausible in
software supply chain attacks and matched each one to the P-SSCRM controls
that mitigate it. Four independent strategies were used to propose
candidate mappings &mdash; including keyword and technique-description
matching and manual analysis grounded in real supply chain incidents &mdash;
and only the mappings the strategies agreed on were kept. That is the same
approach the [*Closing the Chain*]({{ "/news/2026/09/23/closing-the-chain/" | relative_url }})
paper used to check frameworks against real attacks, applied here to build a
mapping instead of an evaluation.

<figure class="attck-figure">
  <div class="attck-flow" role="group" aria-label="How the ATT&CK to P-SSCRM mapping was built">
    <div class="attck-flow-node">
      <div class="attck-flow-head">
        <span class="attck-flow-icon">{% include icon.html name="search" %}</span>
        <span class="attck-flow-num">Step 1</span>
      </div>
      <h3>ATT&amp;CK techniques</h3>
      <p>Techniques used or plausible in software supply chain attacks such as SolarWinds, Log4j, and XZ Utils.</p>
    </div>
    <div class="attck-flow-arrow" aria-hidden="true"></div>
    <div class="attck-flow-node">
      <div class="attck-flow-head">
        <span class="attck-flow-icon">{% include icon.html name="layout-grid" %}</span>
        <span class="attck-flow-num">Step 2</span>
      </div>
      <h3>Four independent strategies</h3>
      <p>Separate passes &mdash; keyword matching, technique-description matching, and manual, incident-grounded analysis &mdash; each propose candidate control&ndash;technique pairs.</p>
    </div>
    <div class="attck-flow-arrow" aria-hidden="true"></div>
    <div class="attck-flow-node">
      <div class="attck-flow-head">
        <span class="attck-flow-icon">{% include icon.html name="clipboard-check" %}</span>
        <span class="attck-flow-num">Step 3</span>
      </div>
      <h3>Agreed-upon mapping</h3>
      <p>Only pairs the strategies agree on are kept, producing the reconciled mapping.</p>
    </div>
    <div class="attck-flow-arrow" aria-hidden="true"></div>
    <div class="attck-flow-node">
      <div class="attck-flow-head">
        <span class="attck-flow-icon">{% include icon.html name="wrench" %}</span>
        <span class="attck-flow-num">Step 4</span>
      </div>
      <h3>P-SSCRM controls</h3>
      <p>Each technique is attached to the control(s) that mitigate it &mdash; and, through those controls, to the ten standards they already cite.</p>
    </div>
  </div>
  <figcaption>How the ATT&amp;CK&ndash;to&ndash;P-SSCRM mapping was built, from technique to reconciled control mapping.</figcaption>
</figure>

## From control, to technique, to standard

Because P-SSCRM controls already cite standards like BSIMM and the CNCF
Software Supply Chain Best Practices, adding the ATT&CK mapping gives a
three-way link. [P.3.3, &ldquo;Require signed commits&rdquo;]({{ "/framework/" | relative_url }}#p-3-3)
mitigates a single technique and cites two standards, so the whole chain fits
in one diagram:

<figure class="attck-figure">
  <div class="attck-flow" role="group" aria-label="Example: P.3.3 Require signed commits, mapped to technique and standards">
    <a class="attck-flow-node attck-flow-node-control" href="{{ "/framework/" | relative_url }}#p-3-3">
      <div class="attck-flow-head">
        <span class="attck-flow-icon attck-flow-icon-control">{% include icon.html name="shield" %}</span>
        <span class="attck-node-label">P-SSCRM Control</span>
      </div>
      <span class="attck-node-name">P.3.3 &mdash; Require signed commits</span>
    </a>
    <div class="attck-flow-arrow" aria-hidden="true"></div>
    <a class="attck-flow-node attck-flow-node-technique" href="https://attack.mitre.org/techniques/T1554/" target="_blank" rel="noopener">
      <div class="attck-flow-head">
        <span class="attck-flow-icon attck-flow-icon-technique">{% include icon.html name="search" %}</span>
        <span class="attck-node-label">ATT&amp;CK Technique</span>
      </div>
      <span class="attck-node-name">T1554 &mdash; Compromise Host Software Binary</span>
    </a>
    <div class="attck-flow-arrow" aria-hidden="true"></div>
    <div class="attck-flow-node attck-flow-node-standards">
      <div class="attck-flow-head">
        <span class="attck-flow-icon attck-flow-icon-standards">{% include icon.html name="clipboard-check" %}</span>
        <span class="attck-node-label">Standards</span>
      </div>
      <ul class="framework-list">
        <li class="framework-badge"><a href="{{ "/frameworks/" | relative_url }}#bsimm" target="_blank" rel="noopener">BSIMM</a> <span class="mapping-ref">SE2.4</span></li>
        <li class="framework-badge"><a href="{{ "/frameworks/" | relative_url }}#cncf-ssc" target="_blank" rel="noopener">CNCF-SSC</a> <span class="mapping-ref">Sign every step in the build process</span></li>
      </ul>
    </div>
  </div>
  <figcaption>P.3.3 mitigates ATT&amp;CK technique T1554, and already cites BSIMM and the CNCF-SSC best practices &mdash; so the ATT&amp;CK mapping links T1554 to those standards too.</figcaption>
</figure>

## See a control's ATT&CK mapping directly

Every control's entry on [The Framework]({{ "/framework/" | relative_url }}) lists the
ATT&CK technique(s) it mitigates, next to its standard mappings. A few examples,
technique shown alongside each:

<ul class="attck-examples">
  <li><a href="{{ "/framework/" | relative_url }}#p-3-3">P.3.3 &mdash; Require signed commits</a> <span class="mapping-ref">T1554</span></li>
  <li><a href="{{ "/framework/" | relative_url }}#p-4-1">P.4.1 &mdash; Security code review</a> <span class="mapping-ref">T1195</span></li>
  <li><a href="{{ "/framework/" | relative_url }}#d-1-6">D.1.6 &mdash; Root cause analysis</a> <span class="mapping-ref">T1195</span></li>
</ul>

<p class="attck-examples-note">Or open <a href="{{ "/framework/" | relative_url }}">The Framework</a> and expand any control to see its mapping.</p>

## From technique back to controls

The mapping also runs in reverse: pick an ATT&CK technique below to see every
P-SSCRM control that mitigates it, grouped by Practice. Search to find a
specific technique or control.

{% assign all_techniques = "" | split: "" %}
{% for control in site.controls %}
  {% if control.mitre_attack %}
    {% assign all_techniques = all_techniques | concat: control.mitre_attack %}
  {% endif %}
{% endfor %}
{% assign techniques = all_techniques | uniq | sort %}

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
  <input type="search" id="reverse-map-filter" class="reverse-map-filter" placeholder="Search a technique, e.g. T1554, or a control&hellip;" aria-controls="reverse-map">
  <button type="button" class="expand-all-btn" id="reverse-map-expand-all">Expand all</button>
  <button type="button" class="expand-all-btn" id="reverse-map-collapse-all">Collapse all</button>
</div>
<p class="reverse-map-empty" id="reverse-map-empty" hidden>No techniques match that search.</p>
<p class="section-note">{{ techniques.size }} ATT&amp;CK techniques are mapped. Click one to open it, or search to find a specific one.</p>

<div class="reverse-map reverse-map-compact" id="reverse-map">
  {% for technique in techniques %}
    {% assign last_practice = "" %}
    {% assign t_count = 0 %}
    {% assign g_count = 0 %}{% assign p_count = 0 %}{% assign e_count = 0 %}{% assign d_count = 0 %}
    {% for control in ordered_controls %}
      {% if control.mitre_attack contains technique %}
        {% assign t_count = t_count | plus: 1 %}
        {% assign g0 = control.code | slice: 0 %}
        {% case g0 %}
          {% when "G" %}{% assign g_count = g_count | plus: 1 %}
          {% when "P" %}{% assign p_count = p_count | plus: 1 %}
          {% when "E" %}{% assign e_count = e_count | plus: 1 %}
          {% when "D" %}{% assign d_count = d_count | plus: 1 %}
        {% endcase %}
      {% endif %}
    {% endfor %}
    <details>
      <summary>
        <span class="reverse-map-name"><a href="https://attack.mitre.org/techniques/{{ technique }}/" target="_blank" rel="noopener">{{ technique }}</a></span>
        <span class="reverse-map-ratio" title="{{ g_count }} Governance &middot; {{ p_count }} Product &middot; {{ e_count }} Environment &middot; {{ d_count }} Deployment">
          <span class="role-card-bar">
            {% if g_count > 0 %}<span class="role-card-seg role-seg-g" style="flex-grow: {{ g_count }};"></span>{% endif %}
            {% if p_count > 0 %}<span class="role-card-seg role-seg-p" style="flex-grow: {{ p_count }};"></span>{% endif %}
            {% if e_count > 0 %}<span class="role-card-seg role-seg-e" style="flex-grow: {{ e_count }};"></span>{% endif %}
            {% if d_count > 0 %}<span class="role-card-seg role-seg-d" style="flex-grow: {{ d_count }};"></span>{% endif %}
          </span>
          <span class="reverse-map-count">{{ t_count }}</span>
        </span>
      </summary>
      <div class="reverse-map-body">
        {% for control in ordered_controls %}
          {% if control.mitre_attack contains technique %}
            {% if control.practice != last_practice %}
              {% assign practice = site.practices | where: "slug", control.practice | first %}
              <p class="reverse-map-practice fw-group-{{ practice.group }}"><span class="code-badge">{{ practice.code }}</span> {{ practice.title }}</p>
              {% assign last_practice = control.practice %}
            {% endif %}
            <a class="reverse-map-item" href="{{ "/framework/" | relative_url }}#{{ control.slug }}" data-code="{{ control.code | downcase }}" data-title="{{ control.title | downcase }}" data-ref="{{ technique | downcase }}">{{ control.code }} &mdash; {{ control.title }}</a>
          {% endif %}
        {% endfor %}
      </div>
    </details>
  {% endfor %}
</div>
<script src="{{ "/static/js/reverse-map-filter.js" | relative_url }}?v={{ site.time | date: '%s' }}" defer></script>
