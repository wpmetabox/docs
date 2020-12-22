---
title: HTML5 Input Types
---

## Overview

In addition to the [supported field types](https://docs.metabox.io/field-settings/), Meta Box also supports all HTML5 input types, such as `url` and `tel`. You can start using them without writing any extra code.

## What is HTML5 input types?

[HTML5 input types](http://html5doctor.com/html5-forms-input-types/) are types for the text input that are added to the HTML5 and are supported by all browsers. They act similar to `text` input, but for other data types, such as URL, email or date. Using HTML5 input types have some benefits:

- You have built-in UI like the arrow up/down for `number` or a picker for date/time/week. The UI is various in different browsers, but it works. And it also supports mobile devices.

![built-in UI for week input](https://i.imgur.com/owRtMYv.png)

- You have built-in validation. If users enter invalid data (for `url` or `email`), the browser will throw an error.

![invalid email error](https://i.imgur.com/vmUkaIP.png)

- Finally, you have a semantic markup

Here are the list of HTML5 input types that you can use:

Input Type | Description
---|---
`search`|Search input field
`email`|Email input field, which has validation for email
`url`|URL input field, which has validation for URL (e.g. must starts with `http`)
`tel`|Telephone input field
`number`|Number input field, which has up/down arrows to increase/decrease the number.
`range`|Range input field, which allows you select a number by dragging a control.
`month`|Month input field, which has the built-in UI for picking a month
`week`|Week input field, which has the built-in UI for picking a week
`datetime-local`|Datetime input field, which has the built-in UI for picking a date and time with the local timezone

Please note that some types such as `date`, `datetime`, `time` and `color` are already implemented with different UI. So they're not available as the custom HTML5 input types anymore.

## Using HTML5 input types with Meta Box

Using HTML5 input types with Meta Box is as simple as `text` field. All you need to do is **set the `type` attribute** of the field to the corresponding HTML 5 input type.

For example, the code below creates a `tel` field:

```php
[
    'id'   => 'field_id',
    'type' => 'tel', // New HTML 5 input type
    'name' => 'Telephone',
]
```

That's it.

In order to customize the field, you might want to add some [custom attributes](https://docs.metabox.io/custom-attributes/) to the input such as `size`, `pattern`. Even without custom attributes, the field work just fine and you'll benefit from all things that HTML5 provide.
