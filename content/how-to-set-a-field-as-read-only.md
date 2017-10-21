---
title: How to set a field as read only?
permalink: /how-to-set-a-field-as-read-only/
---

Sometimes you want to make fields in a form read-only to prevent users enter an unexpected value (still show the fields, not make them hidden). There are 2 ways to do that:

## Using a custom attribute

Since version 4.7, the Meta Box plugin adds custom attributes to all input fields which can be used to set `readonly`, `disabled`, etc. for inputs.

So, to make an text field read-only, simply add `'readonly' => true` to the field, like this:

```php
array(
    'id'       => 'field_id',
    'type'     => 'text',
    'name'     => 'Readonly field',
    'readonly' => true,
)
```

For more information about input attributes, please read [this documentation](/docs/custom-attributes-for-inputs/).

## Using hooks

**Add filter to `rwmb_{$field_id}_html`**:

```php
add_filter( 'rwmb_YOUR_FIELD_ID_1_html', 'prefix_input_readonly' );
add_filter( 'rwmb_YOUR_FIELD_ID_2_html', 'prefix_input_readonly' );
function prefix_input_readonly( $html ) {
    return str_replace( '<input', '<input readonly', $html );
}
```

That makes fields with ID `YOUR_FIELD_ID_1` and `YOUR_FIELD_ID_2`, which have `input` tag (like `text`, `number`, etc.) read only. Remember to change field ID(s) in this example to real ones.

**Tip:** Repeat as many as you want the `add_filter` statement to make more fields read only.

If you need to make textarea or select dropdown read only, change the callback function to:

```php
add_filter( 'rwmb_YOUR_FIELD_ID_1_html', 'prefix_input_readonly' );
add_filter( 'rwmb_YOUR_FIELD_ID_2_html', 'prefix_input_readonly' );
function prefix_input_readonly( $html ) {
    return str_replace(
        array(
            '<input',
            '<textarea',
            '<select',
        ),
        array(
            '<input readonly',
            '<textarea readonly',
            '<select disabled',
        ),
        $html );
}
```

For more details about `rwmb_{$field_id}_html`, please read [this documentation](/filters/).

This tutorial is based on a question from [support forum](https://wordpress.org/support/topic/how-to-set-a-field-as-read-only?replies=3). Thank gonzalezea for asking.