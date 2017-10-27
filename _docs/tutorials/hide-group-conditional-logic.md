---
title: Hide Group with Conditional Logic
---

**Since 1.2, you can hide Group without using this ugly hack! Group just works as other fields**

~~Currently, Meta Box Group doesn't output html ID attribute so Conditional Logic can't touch Group. To hide Group, we'll need an extra hack Imagine we have a Group like this:~~

```php
'fields' => array(
    array(
        'id'     => 'standard',
        'type'   => 'group',
        'clone'  => true,
        'sort_clone' => true,
        'hidden' => array('post_format', 'aside'), // Doesn't work
        ...
    )
)
```

~~So we'll wrap this field by a ID which same as this group's ID.~~

```php
'fields' => array(
    array(
        'id'     => 'standard',
        'type'   => 'group',
        'clone'  => true,
        'sort_clone' => true,
        'hidden' => array('post_format', 'aside'), // This will works
        'before' => '<div id="standard">', // ID should same as this field id
        'after'     => '</div>',
        ...
    )
)
```