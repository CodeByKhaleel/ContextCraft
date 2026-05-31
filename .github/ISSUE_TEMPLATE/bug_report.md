---
name: Bug report
about: Create a report to help us improve
title: ''
labels: ''
assignees: ''

---

name: Bug Report
description: Report a bug or unexpected behavior
title: "[Bug]: "
labels: ["bug"]

body:
  - type: textarea
    id: description
    attributes:
      label: What happened?
      placeholder: Describe the issue clearly
    validations:
      required: true

  - type: textarea
    id: steps
    attributes:
      label: Steps to reproduce
      placeholder: |
        1. Go to...
        2. Click...
        3. See error...
    validations:
      required: true

  - type: textarea
    id: expected
    attributes:
      label: Expected behavior
      placeholder: What should happen?

  - type: textarea
    id: screenshots
    attributes:
      label: Screenshots
      placeholder: Add screenshots if available

  - type: input
    id: browser
    attributes:
      label: Browser
      placeholder: Chrome / Firefox / Edge
