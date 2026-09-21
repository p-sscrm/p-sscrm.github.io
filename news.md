---
layout: page
title: "News"
permalink: /news/
description: "Announcements and updates about P-SSCRM."
---

Announcements and updates about P-SSCRM, newest first.

<ul class="news-list">
  {% for post in site.posts %}
    <li>
      <span class="news-date">{{ post.date | date: "%B %-d, %Y" }}</span>
      <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
      {% if post.excerpt %}<p>{{ post.excerpt | strip_html | truncatewords: 40 }}</p>{% endif %}
    </li>
  {% endfor %}
</ul>
