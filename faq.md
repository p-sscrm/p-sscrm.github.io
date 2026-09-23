---
title: "Frequently Asked Questions"
permalink: /faq/
---

### What is P-SSCRM?

P-SSCRM (Proactive Secure Software Supply Chain Risk Management) is a framework
for managing software supply chain security risk, organized into Groups,
Practices, and Controls. Each control maps to one or more established external
standards. See [What is P-SSCRM?]({{ "/about/" | relative_url }}) for the full
story, or [The Framework]({{ "/framework/" | relative_url }}) for the model
itself.

### Who maintains P-SSCRM?

The framework definition and its standard mappings are maintained in the open at
[github.com/p-sscrm/p-sscrm](https://github.com/p-sscrm/p-sscrm){:target="_blank" rel="noopener"}; the MITRE
ATT&CK technique mappings at
[github.com/p-sscrm/ats-to-ts](https://github.com/p-sscrm/ats-to-ts){:target="_blank" rel="noopener"}. It is
stewarded by researchers at NC State University with the
[S3C2](https://s3c2.org/){:target="_blank" rel="noopener"} center. This website is generated from those data
repositories.

### How does P-SSCRM relate to SSDF, SLSA, BSIMM, and the others?

P-SSCRM does not replace them — it unifies them. Every control carries a
"Standard mappings" line pointing back to the specific sections of the source
standards it draws from. The full list of contributing standards is on
[The Framework]({{ "/framework/" | relative_url }}#standards), and each one has a
"which controls cite this" breakdown there.

### How do I assess my project against P-SSCRM?

Work through [The Framework]({{ "/framework/" | relative_url }}) control by
control. Each control has an "Assessment questions" list — discuss them
with the people who own that area and note where you stand. This is a
qualitative check, not a score. For a formal, interview-based assessment, see
[Measure and Improve]({{ "/participate/" | relative_url }}).

### How can I contribute or report an issue?

If the framework content itself is wrong or incomplete, open an issue or pull
request on [github.com/p-sscrm/p-sscrm](https://github.com/p-sscrm/p-sscrm){:target="_blank" rel="noopener"}. For
anything about this website, or to get in touch with the maintainers, see
[Contact]({{ "/contact/" | relative_url }}).
