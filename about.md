---
title: "What is P-SSCRM?"
permalink: /about/
description: "What P-SSCRM is, why it exists, how it was built, and how to cite it."
---

## What P-SSCRM is

P-SSCRM (Proactive Secure Software Supply Chain Risk Management) is a framework
for managing software supply chain security risk. It organizes the work into
**Groups** — Governance, Product, Environment, and Deployment, plus an
Unassigned holding group for controls identified but not yet tied to a
standard — each broken into **Practices** and then into concrete **Controls**.
Every control states an objective, a fuller definition, a set of
self-assessment questions, and a mapping to the established standards it
draws from.

## The problem it solves

Teams trying to secure a software supply chain face a crowded field of
government and industry guidance — SSDF, SLSA, BSIMM, CNCF, OpenSSF, NIST
800-161, Executive Order 14028, and more — with overlapping vocabulary and no
single through-line. P-SSCRM was built to be that through-line: a single model
whose controls are cross-referenced to those sources, so a team can work from
one checklist and still show alignment with the standards that apply to them.

## How it was built

P-SSCRM was assembled by analyzing the contributing standards and frameworks
listed under [Standards & Frameworks]({{ "/frameworks/" | relative_url }}),
identifying the common practices across them, and expressing each as a control
with an explicit back-mapping. The framework definition and its mappings are
maintained in the open at
[github.com/p-sscrm/p-sscrm](https://github.com/p-sscrm/p-sscrm); the MITRE
ATT&CK technique mappings are maintained at
[github.com/p-sscrm/ats-to-ts](https://github.com/p-sscrm/ats-to-ts). This site
is generated from those repositories.

<figure class="lifecycle-figure">
  <img src="{{ "/static/img/lifecycle-model.png" | relative_url }}" alt="P-SSCRM lifecycle model by role: Practices A to O placed along the software lifecycle from internally developed source through build, package, deploy, run and retire, coloured by the role responsible.">
  <figcaption>The P-SSCRM lifecycle model by role: where each Practice applies across the software lifecycle, and which role owns it.</figcaption>
</figure>

## Who it's for

<ul class="audience-cards">
  <li><span class="card-icon">{% include icon.html name="shield" %}</span><h3>Security leaders</h3><p>Planning or benchmarking a supply chain security program.</p><a href="{{ "/framework/" | relative_url }}">The Framework</a></li>
  <li><span class="card-icon">{% include icon.html name="wrench" %}</span><h3>Engineers</h3><p>Engineers and practitioners doing the work of securing builds, dependencies and deployments.</p><a href="{{ "/roles/" | relative_url }}">Which controls apply to me?</a></li>
  <li><span class="card-icon">{% include icon.html name="clipboard-check" %}</span><h3>Assessors</h3><p>Assessors and consultants evaluating a program against recognized practice.</p><a href="{{ "/framework/" | relative_url }}#self-assessment">Self-assessment</a></li>
  <li><span class="card-icon">{% include icon.html name="search" %}</span><h3>Researchers</h3><p>Researchers and standards authors looking for a consolidated view of the field.</p><a href="{{ "/frameworks/" | relative_url }}">Contributing standards</a></li>
</ul>

## Citing P-SSCRM

P-SSCRM is described in the paper *P-SSCRM: Proactive Secure Software Supply
Chain Risk Management*, available at
[arxiv.org/abs/2404.12300](https://arxiv.org/abs/2404.12300). Please cite that
paper and link to this site.

## Who maintains it

P-SSCRM is stewarded by researchers at NC State University in collaboration with
the [Secure Software Supply Chain Center (S3C2)](https://s3c2.org/). For
questions or corrections, see [Contact]({{ "/contact/" | relative_url }}).

## License

The framework content is published by the upstream project; see
[github.com/p-sscrm/p-sscrm](https://github.com/p-sscrm/p-sscrm) for its
license. This website's code is in the site repository.

## Version history
{: #versions}

Only the version marked **current** should be used for new compliance work;
earlier versions are kept for reference. Data comes directly from
[p-sscrm/p-sscrm](https://github.com/p-sscrm/p-sscrm) and
[p-sscrm/ats-to-ts](https://github.com/p-sscrm/ats-to-ts).

#### Framework
{: .version-heading}

<ul class="version-list">
  {% for ver in site.data.versions %}
    <li>
      {% if ver.current %}<strong>Current</strong>{% else %}Previous{% endif %} &mdash;
      <span class="version-number">v{{ ver.version }}</span>
      (<a href="{{ ver.download_url }}" target="_blank" rel="noopener">JSON</a>)
    </li>
  {% endfor %}
</ul>

#### MITRE ATT&CK mapping
{: .version-heading}

<ul class="version-list">
  {% for ver in site.data.mitre_versions %}
    <li>
      {% if ver.current %}<strong>Current</strong>{% else %}Previous{% endif %} &mdash;
      <span class="version-number">v{{ ver.version }}</span>
      (<a href="{{ ver.download_url }}" target="_blank" rel="noopener">JSON</a>)
    </li>
  {% endfor %}
</ul>
