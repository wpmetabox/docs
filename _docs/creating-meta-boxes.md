---
title: Creating a field group
---

Meta Box uses field groups to attach custom fields to posts, terms, or users. There are 3 ways to create a field group:

- **Using Meta Box Builder**: it has a user-friendly UI and supports other extensions.
- **Using Online Generator**: the slim version of Meta Box Builder that supports only custom fields (no support for extensions) and export PHP code.
- **Using code**

## Using Meta Box Builder

Meta Box Builder creates a UI for you to add and manage your custom fields. It also integrates with other extensions to let you do many things without touching code.

### Add a new field group

Go to *Meta Box &rarr; Custom Fields*. Then click the **Add New** button.

![creating a meta box (field group)](https://i.imgur.com/atmAw8E.png)

Enter the field group title in the **Title** box. The field group ID is then automatically generated. You can change the ID if you want, it's optional.

### Fields

Select the fields you want to add to the field group by clicking the **+ Add Field** button. When clicking on a field, it will be automatically added to the list of fields in the field group.

{% include alert.html content="To find a field type quickly, type its name in the input box above the field list. The plugin will filter the fields and show only matched fields." %}

While working on fields, you can:

- Delete or duplicate a field by clicking the icons in the field title bar.
- Reveal field settings by clicking anywhere in the field title bar.
- Reorder fields by drag and drop fields to the new positions.

Each field settings are self-explained. We also add some tooltips next to the setting title to give you more information if needed. All field settings are divided into 2 tabs: General, Advanced. These settings are explained in detailed [here](https://docs.metabox.io/field-settings/). Some settings are for other extensions which are explained on each extension docs.

To understand field types and settings for each type, please see this video below:

<iframe width="560" height="315" src="https://www.youtube.com/embed/WWeaM5vIAwM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Settings

The field group settings are put in the tab **Settings**:

![field group settings](https://i.imgur.com/K3emckr.png)

Here you'll see location rules, which are used to set where the field group appears, custom CSS class, and custom settings. If you have other extensions activated, their settings are also displayed here such as advanced location rules (from Meta Box Include Exclude), conditional logic (from Meta Box Conditional Logic), block settings (from MB Blocks), etc.

---

To learn more about using Meta Box Builder, please follow [this detailed guide](/extensions/meta-box-builder/).

## Using Online Generator

Online Generator is a tool to help you create custom fields with UI. You can add fields, set options, and generate needed code that's ready to copy and paste.

We have written a detailed guide on using the Online Generator. Please follow [it here](/online-generator/).

## Using code

If you're a developer and want to use all power of Meta Box, then using code is the right choice. Meta Box provides a complete API for you to register, manage and customize custom fields the way you want.

To create a field group, you need to hook to the filter `rwmb_meta_boxes` to add the field group settings. This filter accepts 1 parameter - the array of settings.

The code below registers a simple field group:

```php
add_filter( 'rwmb_meta_boxes', 'prefix_register_meta_boxes' );
function prefix_register_meta_boxes( $meta_boxes ) {
    $meta_boxes[] = [
        'title'      => 'Personal Information',
        'post_types' => 'post',
        'id'         => 'personal-information',
        'fields' => [
            [
                'name'  => 'Full name',
                'desc'  => 'Format: {First Name} {Last Name}',
                'id'    => 'prefix_name',
                'type'  => 'text',
            ],
            // More fields.
        ]
    ];

    // Add more field groups if you want
    // $meta_boxes[] = ...

    return $meta_boxes;
}
```

### Field group settings

Each field group has the following settings:

Name|Description
--|--
`id`|ID, must be unique. Optional. If it's absent, it will be generated from `title` using `sanitize_title` function.
`title`|Title. Required.
`post_types`|Custom post types which the field group is for. There can be an array of multiple custom post types or a string for the single post type. Must be in lowercase (like the slug). Optional. Default: `post`.
`context`|Where the field group is displayed. See below for a list of field group contexts. Optional.
`style`|Whether to keep the default WordPress field group style (`default`) or remove the wrapper box and display the fields seamlessly (`seamless`).
`closed`|Whether to collapse the field group when the page loads? Optional. Default: `false`.
`priority`|Priority within the context where the box is displayed (`high` or `low`). Optional. Default: `high`.
`default_hidden`|Hide the field group by default (`true` or `false`)? The field group can be toggled using the checkbox option in screen Help (on the top right). Optional. Default `false`.
`autosave`|Auto save the custom fields' values (like post content and title)? Optional. Default: `false`.
`media_modal`|Add custom fields to media modal when viewing/editing an attachment. Works only when `post_types` is or contains `attachment`. Optional. Default `false`.
`class`|Custom CSS class for the field group wrapper. Optional.
`fields`|Array of fields. See section below.

{% include alert.html type="info" content="Because of some limitations in the media modal, only simple fields such as text, select, radio, checkbox work. Other fields that require custom JavaScript don't work, unfortunately." %}

#### Contexts

The plugin supports the following contexts (locations) where a field group can appear:

Name|Description
`normal`|Below the post editor. This is the default value.
`advanced`|Below the `normal` section.
`side`|On the right sidebar.
`form_top`|Top of the post form, before the post title. Added in version 4.13.0.
`after_title`|After post title. Added in version 4.13.0.
`after_editor`|After the post content editor, but before `normal` section. Added in version 4.13.0.
`before_permalink`|Before permalink. Added in version 4.13.0.

This is the screenshot how field groups appear in `form_top` and `after_title` locations (used with `seamless` style):

![meta box locations](https://i.imgur.com/kBKbS3wl.png)

{% include alert.html type="warning" content="Gutenberg editor does NOT support extra contexts. Only normal, advanced, and side contexts are supported. If you use Gutenberg, use these contexts only." %}

#### Contexts not working

There are some situations that the context doesn't work as expected. That is probably because you have dragged and dropped the field groups to reorder them? If you have, then WordPress will save the position/location of them and makes the `context` parameter not working. The order of field groups is saved in the user meta `meta-box-order_{screen id}` as follows:

![meta box order](https://i.imgur.com/A7bkxT9.png)

In this case, deleting this user meta from the database will make the context work again.

### Fields

Fields are added to a field group via the key `fields`. Each field is an array of settings. In the example above, the text field is defined via:

```php
array(
    'name'  => 'Full name',
    'desc'  => 'Format: {First Name} {Last Name}',
    'id'    => $prefix . 'name',
    'type'  => 'text',
),
```

Meta Box supports more than 40 field types. All fields share some common settings like `id`, `type`, but also offer unique settings per field type. See [this guide](/field-settings/) for more details.

{% include alert.html content="Field ID is used as the meta key and the field value is used as the meta value when saving into the post meta table." %}

You can (should) add a prefix to field IDs to prevent from using the same ID with other scripts. If you want to hide the fields in the default WordPress **Custom Fields** meta box, use underscore (`_`) as the prefix.
