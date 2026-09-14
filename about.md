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

## Who it's for

- **Security leaders** planning or benchmarking a supply chain security program.
- **Engineers and practitioners** doing the work — start with
  [Which controls apply to me?]({{ "/roles/" | relative_url }}).
- **Assessors and consultants** evaluating a program against recognized practice.
- **Researchers and standards authors** looking for a consolidated view of the
  field.

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
