---
title: "Self-assessment"
permalink: /self-assessment/
description: "Privately score your own use of each P-SSCRM control, add notes, and see a radar chart. Everything stays in your browser."
---

Score how well your organization follows each control, add your own notes, and
open the radar chart to see where you are strong or thin. Your scores and notes are saved only in this
browser, so nothing is shared or sent anywhere. This is an informal, qualitative
exercise with no official score; for a formal, interview-based assessment see
[Measure and Improve]({{ "/participate/" | relative_url }}).

{% assign sa_scale = "0,0.25,0.5,0.75,1" | split: "," %}
{% assign sa_groups = site.groups | where_exp: "g", "g.slug != 'u'" | sort: "weight" %}
<div class="sa" id="sa">
  <noscript><p class="sa-notice">Self-assessment needs JavaScript to save your scores in this browser.</p></noscript>
  <p class="sa-notice" id="sa-storage-warning" hidden>This browser is blocking storage, so your scores will be lost when you leave the page. Use <strong>Your data &rarr; Export</strong> to keep a copy.</p>

  <div class="sa-top">
    <p class="sa-progress" id="sa-progress" aria-live="polite"></p>
    <button type="button" class="expand-all-btn sa-radar-btn" id="sa-radar-btn" aria-expanded="false" aria-controls="sa-radar">View radar chart</button>
    <details class="sa-data" id="sa-data">
      <summary class="expand-all-btn">Your data</summary>
      <div class="sa-data-menu">
        <div class="sa-data-actions">
          <button type="button" class="expand-all-btn" id="sa-export">Export</button>
          <button type="button" class="expand-all-btn" id="sa-import">Import</button>
          <button type="button" class="expand-all-btn" id="sa-clear">Clear all</button>
        </div>
        <p>Saved only in this browser. Export keeps a copy, or moves your scores to another device or browser.</p>
        <input type="file" id="sa-import-file" accept="application/json,.json" hidden>
      </div>
    </details>
  </div>

  <div class="sa-cols">
    {% for group in sa_groups %}
      {% assign practices = site.practices | where: "group", group.slug | sort: "weight" %}
      <div class="fw-col fw-col-{{ group.slug }} sa-col">
        <p class="fw-col-head sa-col-head"><span class="fw-col-name">{{ group.title }}</span></p>
        {% for practice in practices %}
          {% assign pcontrols = site.controls | where: "practice", practice.slug | sort: "weight" %}
          <button type="button" class="sa-tile" data-practice="{{ practice.slug }}" data-code="{{ practice.code }}" data-group="{{ group.slug }}" data-title="{{ practice.title | escape }}" aria-pressed="false" aria-controls="sa-panel-{{ practice.slug }}">
            <span class="sa-tile-main">
              <span class="sa-tile-name"><span class="code-badge">{{ practice.code }}</span> {{ practice.title }}</span>
              <span class="sa-pips" aria-hidden="true">{% for c in pcontrols %}<i></i>{% endfor %}</span>
            </span>
            <span class="sa-tile-score" data-score>&ndash;</span>
          </button>
        {% endfor %}
      </div>
    {% endfor %}
  </div>

  {% for group in sa_groups %}
    {% assign practices = site.practices | where: "group", group.slug | sort: "weight" %}
    {% for practice in practices %}
      {% assign pcontrols = site.controls | where: "practice", practice.slug | sort: "weight" %}
      <section class="sa-panel fw-group-{{ group.slug }}" id="sa-panel-{{ practice.slug }}" data-practice="{{ practice.slug }}" aria-labelledby="sa-panel-{{ practice.slug }}-title" hidden>
        <div class="sa-panel-head">
          <h2 id="sa-panel-{{ practice.slug }}-title"><span class="code-badge">{{ practice.code }}</span> {{ practice.title }}</h2>
          <span class="sa-panel-avg" data-avg></span>
          <button type="button" class="sa-icon-btn" data-toggle-note="practice" aria-expanded="false" aria-label="Note on {{ practice.title | escape }}" title="Note on this practice">{% include icon.html name="note" %}</button>
          <button type="button" class="sa-text-btn" data-hide-scored aria-pressed="false">Hide scored</button>
          <button type="button" class="sa-icon-btn" data-close aria-label="Close" title="Close">&times;</button>
        </div>
        <div class="sa-note" data-practice-note hidden>
          <label class="sa-note-label" for="sa-pn-{{ practice.slug }}">Your note on this practice</label>
          <textarea id="sa-pn-{{ practice.slug }}" rows="3" maxlength="5000" data-note-for="practice" placeholder="Private to this browser"></textarea>
        </div>
        <ul class="sa-controls">
          {% for control in pcontrols %}
            <li class="sa-control" data-control="{{ control.slug }}" data-code="{{ control.code }}">
              <div class="sa-control-row">
                <span class="code-badge">{{ control.code }}</span>
                <span class="sa-control-title">{{ control.title }}</span>
                <fieldset class="sa-scale">
                  <legend class="visually-hidden">Your score for {{ control.code }} {{ control.title }}</legend>
                  {% for v in sa_scale %}
                    <label><input type="radio" name="sa-s-{{ control.slug }}" value="{{ v }}"><span>{% case v %}{% when "0.25" %}.25{% when "0.5" %}.5{% when "0.75" %}.75{% else %}{{ v }}{% endcase %}</span></label>
                  {% endfor %}
                </fieldset>
                <button type="button" class="sa-icon-btn" data-toggle-note="control" aria-expanded="false" aria-label="Note on {{ control.code }}" title="Note">{% include icon.html name="note" %}</button>
                <button type="button" class="sa-icon-btn sa-chevron" data-toggle-more aria-expanded="false" aria-label="Details for {{ control.code }}" title="Details"></button>
              </div>
              <div class="sa-note" data-control-note hidden>
                <label class="visually-hidden" for="sa-cn-{{ control.slug }}">Your note on {{ control.code }}</label>
                <textarea id="sa-cn-{{ control.slug }}" rows="3" maxlength="5000" data-note-for="control" placeholder="Private to this browser"></textarea>
              </div>
              <div class="sa-more" data-more hidden>
                {% if control.definition %}<p class="fw-definition">{{ control.definition }}</p>{% endif %}
                {% if control.questions and control.questions.size > 0 %}
                  <p class="fw-label">Assessment questions</p>
                  <ul>{% for q in control.questions %}<li>{{ q.text }}</li>{% endfor %}</ul>
                {% endif %}
                <p><a href="{{ "/framework/" | relative_url }}#{{ control.slug }}">See {{ control.code }} in the framework</a></p>
              </div>
            </li>
          {% endfor %}
        </ul>
      </section>
    {% endfor %}
  {% endfor %}

  <section class="sa-panel sa-radar" id="sa-radar" aria-labelledby="sa-radar-title" hidden>
    <div class="sa-panel-head">
      <h2 id="sa-radar-title">Your radar chart</h2>
      <span class="sa-panel-avg">average score per practice</span>
      <button type="button" class="sa-icon-btn" data-close aria-label="Close" title="Close">&times;</button>
    </div>
    <div class="sa-radar-body">
      <div class="sa-radar-fig">
        <svg id="sa-radar-svg" class="sa-radar-svg" viewBox="-150 -140 300 280" role="img" aria-label="Radar chart of your average score for each practice"></svg>
        <div class="sa-radar-tip" id="sa-radar-tip" role="presentation" hidden></div>
        <p class="sa-radar-legend" aria-hidden="true">
          <span><i class="sa-key"></i> All controls scored</span>
          <span><i class="sa-key is-partial"></i> Some not scored yet</span>
        </p>
      </div>
      <div>
        <p class="sa-radar-note">Practices with no scored controls sit at the centre and are marked "not scored".</p>
        <ul class="sa-radar-list" id="sa-radar-list"></ul>
      </div>
    </div>
  </section>
</div>
<script src="{{ "/static/js/self-assessment.js" | relative_url }}?v={{ site.time | date: '%s' }}" defer></script>
