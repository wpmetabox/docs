---
title: Custom HTML
---

## Overview

The custom HTML field allows you to output anything. You can even use a PHP callback function to output the HTML.

This field is usually used to display custom message/instruction to users. Sometimes, it's used with PHP callback to display more advanced content (such as content from a query).

## Screenshot

![custom html](https://i.imgur.com/LO5Akul.png)

## Settings

Besides the [common settings](/field-settings/), this field has the following specific settings:

Name | Description
--- | ---
`std` | Custom HTML content.
`callback` | PHP function that is called to show custom HTML content. Optional.

## Sample code

```php
array(
    // Field name: usually not used

    'type' => 'custom_html',
    // HTML content
    'std'  => '<div class="alert alert-warning">This is a custom HTML content</div>',

    // PHP function to show custom HTML
    // 'callback' => 'display_warning',
),
```


## Styling

Because this field is usually used to display custom content, it requires some CSS to make the content looks good. To enqueue a CSS file to the admin editing page, use the `rwmb_enqueue_scripts` hook:

```php
add_action( 'rwmb_enqueue_scripts', 'prefix_enqueue_custom_style' );
function prefix_enqueue_custom_style() {
    wp_enqueue_style( 'style-id', get_template_directory_uri() . '/css/admin.css' );
}
```

And in the `admin.css` you can put your custom styles.

Read more about the [rwmb_enqueue_scripts](/actions/) hook.