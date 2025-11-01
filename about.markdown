---
layout: default
title:  "What is P-SSCRM?"
---

<p align="center">
<img src="https://imgs.xkcd.com/comics/standards.png" />
</p>

### WHAT IS THE P-SSCRM'S PURPOSE?
The Proactive Software Supply Chain Risk Management (P-SSCRM) framework is not a new standard. Rather than introducing any new concepts, practices, or tasks, we have aggregated concepts, practices, and tasks from existing software supply chain security frameworks. 

We created the P-SSCRM to learn how software supply chain risk management initiatives work
and to provide a resource for people looking to create or improve their own software supply chain
risk management initiative. In general, every firm creates its software supply chain risk management
initiative with some high-level goals in mind. The use of the P-SSCRM framework is appropriate if
your business goals for software security include:

<ul>
<li>Informed risk management decisions</li>
<li>Clarity on what is “the right thing to do” for a holistic set of roles involved in software supply chain security based upon the guidance referenced in the framework</li>
<li>Improved software and associated supply chain security and compliance assurance.</li>
</ul>
<br>
The P-SSCRM framework provides the structure for a “descriptive” model. That is, P-SSCRM is
not a prescriptive model that recommends what an organization should do to reduce software
supply chain risk. Instead, P-SSCRM provides information on what the organizations that have
undergone a P-SSCRM assessment are doing. Put another way, P-SSCRM is not a set of best
practices defined by some committee for some one-size-fits-all generic problem. Rather, P-SSCRM
is a set of actual practices being performed daily by forward-thinking firms.
<br>
<br>
### WHERE DID THE P_SSCRM COME FROM?

<table border="2px">
    {% for group in site.data.framework.groups %}
        {% assign gidslug = group.id | downcase %}
            <th>
                <a href="{{ '/framework/groups/' | append: gidslug | relative_url }}">{{ group.name }}</a>
            </th>
     {% endfor %}
    <tr>
    {% for group in site.data.framework.groups %}
        {% assign gidslug = group.id | slugify %}
            <td>
                {% for practice in group.practices %}
                    {% assign pidslug = practice.id | slugify %}
                    {% assign pid = practice.id | append: " " %}
                        <a href="{{ '/framework/practices/' | append: pidslug | relative_url }}">{{ pid | append: practice.name }}</a>
                        <br>
                {% endfor %}
            </td>
     {% endfor %}
     </tr>
</table>

### RISK MANAGEMENT ROLES

- Business Manager: This grouping of roles includes compliance, risk, and vendor managers.
- Architect/Developer: This role designs, implements, and tests a software product.
- Information Technology (IT): This role provides the hardware, software, and services
infrastructure to enable an organization to receive, store, retrieve, transmit, and manipulate
data.
- DevOps: This role provides the technology for deploying, delivering, and operating software
applications and services through the integration and collaboration between development
teams and operations teams.
- Software Security: This role creates and facilitates processes and procedures for secure
software development at an organizational level.

### TODO LIFECYCLE
The diagram below displays the P-SSCRM groups and practices in the context of a product lifecycle model,
annotating the primary role responsible for each practice. The practices and associated tasks
protect the integrity of source code, the build environment, deployed and running software
applications. They also include practices to securely decommission a software product at its end of
life. The practices that appear in solid boxes along the top and left side of the lifecycle indicate
practices that are done throughout the product lifecycle.

<img src="/assets/images/PSCCRMLifecycleModel.png" />

### WHO SHOULD USE THE P-SSCRM?

The ten frameworks were chosen because government and industry practitioners frequently
talked about all ten at meetings and summits and on Slack and blogs during the months of
development of P-SSCRM. As the tasks of each framework were added to P-SSCRM, each task was
analyzed for bi-directional equivalence with an existing P-SSCRM task. Two tasks are bi-directionally
equivalent if they have the same meaning but most likely different wording/phrasing in their
definition in the different frameworks. A mapping was added when a task was considered equivalent
to an existing task, and a new task was created otherwise.

We did the other mappings by reading the descriptions of the tasks in the various documents to
assess bi-directional equivalence. The mappings were freely distributed to interested parties for
feedback over a six-month period.
As each of the ten standards was considered for inclusion in the P-SSCRM, the strengths of each
and their value in working together synergistically to provide a holistic view of software supply chain
risk reduction by all five roles were realized. The number of tasks in each of the four groups that
came from each framework is shown in Table 1.
The bolded numbers in Table 1 indicate the framework most influential in providing the tasks for
a group. Twenty of the 23 Governance tasks came from the NIST 800-161 framework. The Business
Manager and Software Security roles often conduct the practices of the governance group, for which
NIST 800-161 provides broad coverage of P-SSCRM tasks in this group, although it falls just short of
providing 100% coverage of the P-SSCRM Governance group tasks. Fourteen of the 19 Product tasks
came from the SSDF framework. Product tasks are done by the Architect/Developer role, and the
SSDF is a development framework. Thirteen of the 23 Environment tasks came from the CNCF SSC
framework. With its focus on the cloud environment, the CNCF SSC framework contains practices
to protect the build infrastructure and computing environment. Finally, 5 of 8 tasks from the
Deployment group come from SSDF. The purpose of including the OpenSSF Scorecard metrics in
the table is to provide a longitudinal status of the ability of software ecosystems to automatically
detect evidence that a task has been conducted on a software product/project. Currently, only 6
Product, 2 Environment, and 1 Deployment tasks can be automatically detected.

### TODO: TABLE OF TASK COUNTS BY FRAMEWORK/PRACTICE

### TERMINOLOGY & DEFINITIONS

- Task. Actions or efforts conducted in the process of implementing a secure software
application and of reducing the security risk of that application and for its producing
organization. Each task has a lower-level objective to aid in secure software development
and risk reduction. For example:
    - P.3.1 Component and container choice: make informed third-party component and container choices
-  Practice. A grouping of P-SSCRM tasks that have a similar mid-level objective to aid in secure
software development and risk reduction. The 73 tasks of the P-SSCRM are organized into 15
practices. For example,
    - P.3 Manage component and container choices: software supply chain risk can be reduced by careful choice and handling of third-party components and containers.
-  Group. A grouping of P-SSCRM practices with a similar high-level objective to aid in secure
software development and risk reduction. The 15 practices of the P-SSCRM are organized
into four groups: Governance, Product, Environment, and Deployment.
o Product (P): Tasks to lead to deploying a secure product with minimal vulnerabilities with associated required attestations and artifacts.

### TABLE 1: TASK COUNTS BY FRAMEWORK AND PRACTICE

<table border="2px">
    <thead>
      <th>Practice/Framework</th>
      {% for fwk in site.data.framework.metadata %}
        {% assign gidslug = group.id | downcase %}
            <th>
                <a href="{{ '/framework/frameworks/' | append: fwk.id | relative_url }}">{{ fwk.id }}</a>
            </th>
      {% endfor %}
    </thead>
    <tbody>
      {% for practice in site.data.taskcount.practices %}
        <tr>
        <td>{{ practice.id }} {{ practice.name }}
        {% for fwk in site.data.framework.metadata %}
            {% assign taskcount = "" %}
            {% for f in practice.frameworks %}
                {% if f.name == fwk.id %}
                    {% assign taskcount = f.count %}
                {% endif %}
            {% endfor %}
            <td> {{ taskcount }}</td>
        {% endfor %}
      {% endfor %}
    <tbody>
