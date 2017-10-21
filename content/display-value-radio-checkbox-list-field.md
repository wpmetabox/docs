---
title: How to display value of radio or checkbox list field?
permalink: /display-value-radio-checkbox-list-field/
---

When you register a radio or a checkbox list field which have some options like "United States", "France" (for countries, for example), you expect the value returned by the helper function `rwmb_meta()` is that text. But it doesn't. Instead it returns only the value (like "us", "fr") of the option. So, how to make it work like you want?

Please note that it's *not a bug of the plugin*. It's actually how the helper function works: it **returns the valued saved in the database**. So, if you register a radio field like this:

```php
array(
    'id' => 'country',
    'type' => 'radio',
    'name' => 'Country',
    'options' => array(
        'us' => 'United States',
        'fr' => 'France',
    ),
)
```

Then the helper function `rwmb_meta` returns only "us" or "fr" because they're the value stored in the database.

To get the label of the option ("United States", "France"), you can use another helper function `rwmb_the_value()`, like this:

```php
rwmb_the_value( $field_id, $args = array(), $post_id = null, $echo = true )
```

This helper function is similar to `rwmb_meta`, but it **formats the value into the human-readable format**. In the case of radio or checkbox list field - **the label of the option**.

So, if you want to show label for the radio or checkbox list, simply use this code:

```php
$label = rwmb_the_value( 'country', '', '', false );
echo 'My country is ', $label;
```