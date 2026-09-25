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
  <div class="attck-timeline attck-timeline-process" role="group" aria-label="How the ATT&CK to P-SSCRM mapping was built">
    <div class="attck-tl-step">
      <div class="attck-tl-marker" data-num="1">{% include icon.html name="search" %}</div>
      <div class="attck-tl-content">
        <h3>ATT&amp;CK techniques</h3>
        <p>Techniques used or plausible in software supply chain attacks such as SolarWinds, Log4j, and XZ Utils.</p>
      </div>
    </div>
    <div class="attck-tl-step">
      <div class="attck-tl-marker" data-num="2">{% include icon.html name="layout-grid" %}</div>
      <div class="attck-tl-content">
        <h3>Four independent strategies</h3>
        <p>Separate passes &mdash; keyword matching, technique-description matching, and manual, incident-grounded analysis &mdash; each propose candidate control&ndash;technique pairs.</p>
      </div>
    </div>
    <div class="attck-tl-step">
      <div class="attck-tl-marker" data-num="3">{% include icon.html name="clipboard-check" %}</div>
      <div class="attck-tl-content">
        <h3>Agreed-upon mapping</h3>
        <p>Only pairs the strategies agree on are kept, producing the reconciled mapping.</p>
      </div>
    </div>
    <div class="attck-tl-step">
      <div class="attck-tl-marker" data-num="4">{% include icon.html name="wrench" %}</div>
      <div class="attck-tl-content">
        <h3>P-SSCRM controls</h3>
        <p>Each technique is attached to the control(s) that mitigate it &mdash; and, through those controls, to the ten standards they already cite.</p>
      </div>
    </div>
  </div>
  <figcaption>How the ATT&amp;CK&ndash;to&ndash;P-SSCRM mapping was built, from technique to reconciled control mapping.</figcaption>
</figure>

## From control, to technique, to standard

Because P-SSCRM controls already cite standards like BSIMM and the CNCF
Software Supply Chain Best Practices, adding the ATT&CK mapping gives a
three-way link. [P.3.3, &ldquo;Require signed commits&rdquo;]({{ "/framework/" | relative_url }}#p-3-3)
is a clean example &mdash; it mitigates a single technique and cites two standards:

<figure class="attck-figure">
  <div class="attck-timeline attck-timeline-example" role="group" aria-label="Example: P.3.3 Require signed commits, mapped to technique and standards">
    <div class="attck-tl-step">
      <div class="attck-tl-marker attck-tl-marker-control">{% include icon.html name="shield" %}</div>
      <div class="attck-tl-content">
        <a class="attck-node attck-node-control" href="{{ "/framework/" | relative_url }}#p-3-3">
          <span class="attck-node-label">P-SSCRM Control</span>
          <span class="attck-node-name">P.3.3 &mdash; Require signed commits</span>
        </a>
      </div>
    </div>
    <div class="attck-tl-step">
      <div class="attck-tl-marker attck-tl-marker-technique">{% include icon.html name="search" %}</div>
      <div class="attck-tl-content">
        <a class="attck-node attck-node-technique" href="https://attack.mitre.org/techniques/T1554/" target="_blank" rel="noopener">
          <span class="attck-node-label">ATT&amp;CK Technique</span>
          <span class="attck-node-name">T1554 &mdash; Compromise Host Software Binary</span>
        </a>
      </div>
    </div>
    <div class="attck-tl-step">
      <div class="attck-tl-marker attck-tl-marker-standards">{% include icon.html name="clipboard-check" %}</div>
      <div class="attck-tl-content">
        <div class="attck-node attck-node-standards">
          <span class="attck-node-label">Standards</span>
          <ul class="framework-list">
            <li class="framework-badge"><a href="{{ "/frameworks/" | relative_url }}#bsimm" target="_blank" rel="noopener">BSIMM</a> <span class="mapping-ref">SE2.4</span></li>
            <li class="framework-badge"><a href="{{ "/frameworks/" | relative_url }}#cncf-ssc" target="_blank" rel="noopener">CNCF-SSC</a> <span class="mapping-ref">Sign every step in the build process</span></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <figcaption>P.3.3 mitigates ATT&amp;CK technique T1554, and already cites BSIMM and the CNCF-SSC best practices &mdash; so the ATT&amp;CK mapping links T1554 to those standards too.</figcaption>
</figure>

## See it on a control

Every control's entry on [The Framework]({{ "/framework/" | relative_url }}) lists its
ATT&CK techniques under &ldquo;ATT&amp;CK techniques,&rdquo; alongside its standard
mappings. A few examples:

<ul class="attck-examples">
  <li><a href="{{ "/framework/" | relative_url }}#p-3-3">P.3.3 &mdash; Require signed commits</a></li>
  <li><a href="{{ "/framework/" | relative_url }}#p-4-1">P.4.1 &mdash; Security code review</a></li>
  <li><a href="{{ "/framework/" | relative_url }}#d-1-6">D.1.6 &mdash; Root cause analysis</a></li>
</ul>

<p class="attck-examples-note">Or browse <a href="{{ "/framework/" | relative_url }}">The Framework</a> directly and expand any control.</p>

## From technique back to controls

The mapping also runs in reverse: pick an ATT&CK technique to see every
P-SSCRM control that mitigates it, grouped by Practice. This is a list of
individual techniques rather than the higher-level ATT&CK Tactics
(kill-chain phases) &mdash; the mapping data only identifies techniques, not
the tactics they belong to. Search below to narrow the list to a specific
technique or control.

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
<p class="section-note">{{ techniques.size }} ATT&amp;CK techniques are currently mapped, collapsed by default &mdash; expand one or search to find it.</p>

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
