---
title: MB Views - Creating WordPress templates without touching theme files
---

MB Views helps you to get Meta Box fields and build your templates on the front end fast and easily.

With MB Views, you can just select fields you want to show, fill in some parameters and done! The extension supports all custom fields built with Meta Box, and also post fields (such as post title and post content), site settings, user fields, and even query fields.

You can also customize all templates in WordPress, even for post types that don't have Meta Box fields.

## Video tutorial

In this video, we show you step-by-step how to use *MB Views* to create singular and archive templates for a custom post type. We also show you the basis of Twig and how to set location rules.

<iframe width="560" height="315" src="https://www.youtube.com/embed/4udvu8PqfkE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Creating a view

To create a view, go to **Meta Box > Views** and click the **Add New** button.

![creat a new view](https://i.imgur.com/VO5oV2T.png)

In the view screen, you'll see 2 areas:

- Template editors: where you can enter template code for the view. It contains 3 editors for the template, CSS and JavaScript.
- Settings: where you can set location rules for the view.

In the main editor, you can enter any HTML or *shortcodes* for the template. All shortcodes will be parsed automatically on the front end.

## Insert fields

To insert a field, click the **Insert Field** button. It will open a panel on the right, where you can see all available fields.

Fields are categorized into 4 tabs:

- Post: contains all post fields and custom fields for posts.
- Site: contains all site fields and settings fields (created by [MB Settings Page](https://metabox.io/plugins/mb-settings-page/) plugin).
- User: contains all user fields and custom fields for users (created by [MB User Meta](https://metabox.io/plugins/mb-user-meta/) plugin).
- Query: contains loop and pagination for archive pages.

To insert a field, click on the field title to insert it. The field might have additional parameters (such as choose image size for image field). And in that case, the plugin will open a popup for you to enter or select options.

![enter field options](https://i.imgur.com/MUsLgWu.png)

When you're done entering the field options, click **Insert** button to insert the field in the editor. The plugin will generate a snippet and insert it into the editor.

If a field doesn't have options, then the plugin will insert a snippet into the editor immediately without opening a popup.

### Cloneable fields

Cloneable fields are marked with a *repeat* icon, like this:

![cloneable group fields](https://i.imgur.com/6KoyJGB.png)

To insert a cloneable field, click on the field title, like inserting a normal field.

The plugin will generate a snippet for the field, like this:

```
{% raw %}
{% for clone in post.tickets %}
    Content here might be different depends on the field type
{% endfor %}
{% endraw %}
```

This is a `for` loop, created using Twig template engine. You'll find more details about it below. The content inside the `for` loop might be different depends on the field type.

### Group fields

Group fields are marked with an arrow on the left, just like the image above. Clicking on the arrow will toggle the group sub-fields.

To insert a sub-field, click on the sub-field title, like inserting a normal field. Depending on the field type, it will open a popup for additional options or not.

{% include alert.html type="warning" content="Important: if you have a cloneable group, before inserting sub-fields, you MUST insert the `for` loop for the group first. To insert the group, click on the group title. See the Cloneable Fields section above for details." %}

### Relationship fields

Relationships created with [MB Relationships](https://metabox.io/plugins/mb-relationships/) extension can be inserted in the tab **Query**.

Once you registered a relationship, it will show 2 fields here: one for "from" side, and one for "to" side. Clicking a field will insert a loop of connected items, and inside the loop, you can insert post/term/user fields as usual.

See tutorial: [How To Display Relationships?](https://metabox.io/mb-views-how-to-display-relationships/)

## Include other views

The plugin allows you to include other views, which helps you to break down a large templates into smaller ones and re-use them in other views.

To insert a view, go to tab tab **Query**, and click on the view you want to insert. Note that when you include view into another view, they have access to the same context as the current view. This means that any variable defined in the main view will be available in the included view.

See tutorial: [Creating and Including Template Parts in MB Views](https://metabox.io/mb-views-creating-including-template-parts/)

## Running PHP functions

To run PHP functions, use the `mb` proxy. It acts as a transformer between views and PHP.

Assume you want to get another post in WordPress with post ID 123, you can write a simple PHP code:

```php
$post = get_post( 123 );
echo $post->post_title;
```

With the `mb` proxy, you can call the `get_post()` function like this:

```html
{% raw %}
{% set post = mb.get_post( 123 ) %}
{{ post.post_title }}
{% endraw %}
```

Here you see, the normal PHP function is prefixed by `mb.`, e.g. `get_post` becomes `mb.get_post`. So if you want to call a function `my_custom_function`, you need to write `mb.my_custom_function`. The parameters passed to the function remain the same.

In case you want to set arguments for functions, use the `set` syntax. Twig allows you to set complex variables, like [lists with keys and values](https://twig.symfony.com/doc/1.x/templates.html#literals) and then you can pass it to the function:

```html
{% raw %}
{% set my_var = ["first", "second"] %}
{% set my_var = {first: "first value", second: "second value"}

{% set value = mb.custom_function( my_var ) %}
{% endraw %}
```

## Custom data

The plugin allows you to pass custom data to the shortcode via custom attributes. This allows you to buid flexible views and show them in multiple places with custom data.

For example, you want to display user info in a view. While fetching custom user data is fine, you might want to set user details (like "name" and "age") in some specific cases. You can pass "name" and "age" to a view shortcode like this:

```
[mbv id="your-view-id" name="Brian" age="50"]
```

And in your view template, you can use this data directly like this:

```html
{% raw %}
<p><strong>Name:</strong> {{ name }}</p>
<p><strong>Age:</strong> {{ age }}</p>
{% endraw %}
```

## Locations

Each view can serve multiple pages on your website. To set where the view appears, go to **Settings** meta box below the editor:

![view locations](https://i.imgur.com/Szjmvnd.png)

There are several options:

### Type

What type of page do you want to set the view for? Supports:

- Singular pages
- Archive pages
- Action: the view will display when an action fires
- Code: you can use PHP or [WordPress conditional tags](https://developer.wordpress.org/themes/basics/conditional-tags/) to set the rules where to show the view.
- Shortcode: you need to use a shortcode to insert the view to the location you want. The shortcode is available *after* you save the view.

### Location Rules

Where you set the rules for the singular and archive pages. Location rules are divided into groups, and in each group, you can set multiple rules.

Rules inside a group are combined with `OR` logical operator, which means the views will serve this page if either condition is satisfied.

Groups are combined with `AND` logical operator, which means the views will serve this page if all conditions are satisfied.

With the combination of `OR` and `AND`, you can build complex rules for views.

### Render type

After choosing location rules, you can decide where to render the view for those chosen pages. You have 2 options:

- Render for the whole page layout, including header and footer. This option is useful when you want to build a complete new page on your site.
- Render for the whole layout between header and footer. Using this option, you have full control to build the layout.
- Render only for the post content area. Using this option, you leave the layout to the theme and control only the post content area.

### Position

If you choose to render the view for the post content area, then you can set it to appear before, after or replace the content area.

### Order

The order settings is used to set the loading order for views. If you have multiple views for the same page, then views with a lower order will render first.

## Hooks

The plugin provides 2 hooks:

### `mbv_location_validate`:

This filter is used to allow developers to create custom rules for location validation. It accepts 3 parameters:

- `$result`: the validation result
- `$view`: the view object (which is a post object)
- `$type`: the view type

For example, if you have a view that display for all archive pages, but you don't want it to appear on pages that have query string `?custom_var=1`, you can do like this:

```php
add_filter( 'mbv_location_validate', function( $result, $view, $type ) {
    // Run for 'my-view-name' only.
    if ( $view->post_name !== 'my-view-name' ) {
        return $result;
    }

    if ( isset( $_GET['custom_var'] ) && $_GET['custom_var'] == 1 ) {
        return false;
    }
    return $result;
} );
```

### `mbv_location_action_active`

This filter is used to allow developers to create custom rules for location validation for the views that has display on a specific action (type = action). It accepts 3 parameters:

- `$active`: is the view active
- `$view`: the view object (which is a post object)
- `$action`: the action name

For example, if you have a view that display on `wp_footer`, but you don't want it to appear on pages that have query string `?custom_var=1`, you can do like this:

```php
add_filter( 'mbv_location_action_active', function( $active, $view, $action ) {
    // Run for 'my-view-name' only.
    if ( $view->post_name !== 'my-view-name' || $action !== 'wp_footer' ) {
        return $active;
    }

    if ( isset( $_GET['custom_var'] ) && $_GET['custom_var'] == 1 ) {
        return false;
    }
    return $active;
} );
```

## Twig

When editing a template for views, you can use any HTML/CSS/JavaScript.

In some cases, when you need to set a condition for an HTML section or loop through all values of an array, then you can use Twig.

[Twig](https://twig.symfony.com/) is a powerful template engine for PHP, which allows you to write conditions (`if..else`), control structure (`for`) and use filters to transform the output.

For example, if you want to output an image if the post doesn't have a featured image, then you can use the following snippet:

```
{% raw %}
{% if post.thumbnail.full %}
    <img src="{{ post.thumbnail.full.url }}">
{% else %}
    <img src="https://via.placeholder.com/800x100">
{% endif %}
{% endraw %}
```

If a field has multiple values, then you can use `for`-loop to render all the values, like this:

```
{% raw %}
{% for country in post.countries %}
    {{ country }}
{% endfor %}
{% endraw %}
```

You can also use filter to transform the value, like this:

```
{% raw %}{{ post.date | date( 'm/d/Y' ) }}{% endraw %}
```

For details about using Twig, please see the [documentation](https://twig.symfony.com/doc/1.x/templates.html).
