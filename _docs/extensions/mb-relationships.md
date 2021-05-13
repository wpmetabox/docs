---
title: MB Relationships
---

MB Relationships helps you to create many-to-many relationships between posts, terms, and users in WordPress.

The plugin uses a custom table for storing relationships and integrates with default WordPress queries to retrieve the connected items easily. Using a custom table has several benefits:

- Bi-directional by its nature
- Easier querying items in both direction (`from` and `to`) or querying sibling items
- Not polluting the post/term/user meta tables
- Better performance

Please note that the custom table is automatically created when the plugin is activated.

## Creating relationships

Creating a relationship is done by either of the following methods:

- **Using Meta Box Builder extension**, which helps you create relationships with UI. This extension is already bundled in Meta Box AIO/MB Core.
- **Using code**.

### Using Meta Box Builder

To create a relationship, go to **Meta Box > Relationships** and click **Add New**.

![create relationships](https://i.imgur.com/aV0N0e2.png)

Here you can enter all the settings for the relationship and each side of the relationship (**From** and **To**).

#### Relationship settings

Name | Description
---|---
Reciprocal relationship | Whether the relationship is reciprocal, e.g. a relationship between items of the same type. If you choose this, make sure you set the settings for "From" and "To" sides the same.

When editing an item, the plugin will show a meta box for selecting connected items. In the case of reciprocal relationships, because it's set between items of the same type, without selecting this setting, the plugin will show 2 meta boxes for both "from" and "to" sides. Selecting this setting will ensure there's only 1 meta box that appears.

#### Side settings

For each side, there are 3 tabs of settings:

- General: for general settings such as object type and post type.
- Meta Box: for extra meta box settings. These settings are the same as the field group settings when creating custom fields.
- Field: for extra field settings. These settings are the same as the field settings (post, term, or user depending on the object type).

#### General settings

![general settings for a relationship side](https://i.imgur.com/aZdXHhf.png)

Name | Description
---|---
Object type | What type of object you want to set. If you choose "Term" or "User", make sure you already activate [MB Term Meta](https://metabox.io/plugins/mb-term-meta/) or [MB User Meta](https://metabox.io/plugins/mb-user-meta/) extension.
Post type | If you select object type = "Post", then the post type settings will appear to let you select the post type.
Taxonomy | If you select object type = "Term", then the taxonomy settings will appear to let you select the taxonomy.
Empty message | The custom message displayed when there are no connections. Leaving this setting blank will use the default message "No connections".
Show as admin column | Show the connections in the admin list table of posts/terms or users. When you select this setting, the following settings will appear.
Column position | Select the position of the admin column. You need to set it after/before or replace an existing column by selecting the option from the dropdown and select/enter the ID of the target column. Note that the plugin already prepares a list of common columns in WordPress, so you can just press the down arrow key to select them. If you create a [custom admin column](https://metabox.io/plugins/mb-admin-columns/), enter the column ID here.
Column title | Custom admin column title. Leaving this setting blank will show the default title from the relationship meta box.
Item link type | For each connected item, you can set how it shows in the admin column: with a link to the edit page, with a link to the view it on the frontend or without links.

#### Meta box settings

The plugin automatically creates meta boxes to let you select connected items. The meta box settings are very much like a [normal meta box](https://docs.metabox.io/creating-meta-boxes/) when you creating custom fields, but simpler.

![meta box settings for a relationship side](https://i.imgur.com/x72aX91.png)

Name | Description
---|---
Title | The custom meta box title. Leaving this setting blank will set the title default "Connected To" or "Connected From".
Context | Where to show the meta box.
Priority | The priority of the meta box. Meta boxes with a high priority will show first.
Style | The meta box style: default (with wrapper) and seamless (no wrapper).
Collapse by default | Whether to collapse the meta box when edit page loads.
Custom CSS class | If you want to style your meta box, then enter a custom CSS class here.

#### Field settings

To select connected items, the plugin uses Meta Box's [post](https://docs.metabox.io/fields/post/), [taxonomy advanced](https://docs.metabox.io/fields/taxonomy-advanced/) or [user](https://docs.metabox.io/fields/user/) field according to the object type of the relationship. This tab shows the settings for the field.

![field settings for a relationship side](https://i.imgur.com/o4Z6Iqu.png)

Name | Description
---|---
Label | The field label. Leaving it empty to hide the field label.
Label description | A description displayed below the field label.
Input description | A description displayed below the field input.
Placeholder | The custom placeholder for the select dropdown.
Query args | Custom query args to get posts/terms/users to select from. It's a set of key-value pairs, which represent the arguments like in the `WP_Query` (for posts), `get_terms` (for terms) and `get_users` (for users).
Max items | The maximum number of selected items. If you want to set the relationship 1:1 or 1:n, then set it 1 (for 1:1 make sure to set on both "From" and "To" side).
Add more text | The custom text for the add more button.
Before | A custom HTML to output before the field.
After | A custom HTML to output after the field.
Custom CSS class | If you want to style the field, then enter a custom CSS class here.

### Using code

#### Basic usage

The code below registers a relationship from posts to pages. Open your theme's `functions.php` file and add:

```php
add_action( 'mb_relationships_init', function() {
    MB_Relationships_API::register( [
        'id'   => 'posts_to_pages',
        'from' => 'post',
        'to'   => 'page',
    ] );
} );
```

This code will show 2 meta boxes for posts and pages in the edit screens:

- For posts: the meta box to select connected pages.
- For pages: the meta box to show the posts that connect from.

Both meta boxes are registered using the *Meta Box* plugin, thus it's flexible and editable. The *Syntax* section will cover some settings for the relationship and meta boxes.

#### Terms to posts

The following example registers a relationship from categories to posts. The settings for `from` and `to` are a little bit more advanced than above.

```php
add_action( 'mb_relationships_init', function () {
    MB_Relationships_API::register( [
        'id'   => 'categories_to_posts',
        'from' => [
            'object_type' => 'term',
            'taxonomy'    => 'category',
        ],
        'to'   => 'post',
    ] );
} );
```

#### Users to posts

The following example registers a relationship from users to posts. It has some advanced settings that we will explain in the *Syntax* section.

```php
add_action( 'mb_relationships_init', function () {
    MB_Relationships_API::register( [
        'id'   => 'users_to_posts',
        'from' => [
            'object_type' => 'user',
            'meta_box'    => [
                'title' => 'Manages',
            ],
        ],
        'to'   => [
            'object_type' => 'post',
            'post_type'   => 'post',
            'meta_box'    => [
                'title' => 'Managed By',
            ],
        ],
    ] );
} );
```

#### Syntax

The main API function `MB_Relationships_API::register` has the following parameters:

Name|Description
---|---
`id`|The relationship ID (or type). It's used to identify a relationship with others. Required.
`from`|The "from" side of the relationship. Required. See below for details.
`to`|The "to" side of the relationship. Required. See below for details.

Both sides `from` or `to` accept various parameters for the connection and meta box.

If you pass **a string** to `from` or `to` (like we did in the *Basic usage* section above), the plugin will understand that as the **post type**. So the relationship will be created from posts to posts with specific post types.

If you pass **an array** to `from` or `to`, then the array accepts the following parameters:

Name|Description
---|---
`object_type`|The object type the relationship is created from/to: `post` (default), `term` or `user`. Optional.
`post_type`|The post type if the `object_type` is set to `post`. Default `post`. Optional.
`taxonomy`|The taxonomy if the `object_type` is set to `term`.
`empty_message`|The message displayed when there's no connections.
`meta_box`|Meta box settings, has the [same settings as a normal meta box](https://docs.metabox.io/creating-meta-boxes/). Below are common settings you might want to change:
-- `title`|The meta box title. Default is "Connect To" for "from" side and "Connected From" for "to" side.
`field`|Field settings, has the [same settings as a normal post/user/taxonomy field](https://docs.metabox.io/field-settings/) according to the object type. Below are common settings you might want to change:
-- `name` | Field title.
-- `placeholder` | Placeholder text.
-- `query_args`|Custom query arguments to get objects of `object_type`. These arguments will be passed to `WP_Query()`, `get_terms()` or `get_users()` depending what `object_type` is.
-- `max_clone` | Maximum number of connections.

The field settings apply from object `from` to object `to`. That means, the custom field (relationship) shows on the object `from` get object type, post type and field settings from object `to`.

#### Reciprocal relationships

To make reciprocal relationships, add another parameter `'reciprocal' => true`:

```php
add_action( 'mb_relationships_init', function() {
    MB_Relationships_API::register( [
        'id'         => 'posts_to_pages',
        'from'       => 'post',
        'to'         => 'post',
        'reciprocal' => true, // THIS
    ] );
} );
```

#### Admin column

The plugin supports showing connected items in the admin list table of posts/terms or users. To enable this feature, add the `admin_column` parameter to the `from` or `to` relationship configuration:

```php
MB_Relationships_API::register( [
    'id'   => 'posts_to_pages',
    'from' => [
        'object_type'  => 'post',
        'admin_column' => true,  // THIS!
    ],
    'to'   => [
        'object_type'  => 'post',
        'post_type'    => 'page',
        'admin_column' => 'after title', // THIS!
    ],
] );
```

Similar to [MB Admin Columns](/extensions/mb-admin-columns), the plugin supports 3 formats of the parameter:

**Enable admin column**

```php
'admin_column' => true,
```

In this case, the column will be added to the end of the list table. And the title of the column will be the title of the connection meta box (when you edit a post).

**Column position**

```php
'admin_column' => 'after title'
```

The format is `'admin_column' => 'type column'` where:

Param|Description
---|---
`type`|Must be `before`, `after` or `replace`. Specify the position of the custom column.
|`before`: Insert the column before an existing column
|`after`: Insert the column after an existing column
|`replace`: Replace an existing column with the new one
`column`|The target existing column

Using this configuration, you can insert the column in any position you want.

In this case, the title of the column will be the title of the connection meta box (when you edit a post).

**Advanced configuration**

To add more rules for the admin column, you can declare `admin_column` parameter as an array which accepts the following keys:

```php
'admin_column' => [
    'position' => 'after title',
    'title'    => 'Price',
    'link'     => 'edit',
],
```

The meaning of keys are described below:

Key|Description
---|---
`position`|Specify where to insert the new column. It's the same as described in the #2 method above.
`title`|Column title. Optional. Default is the meta box title.
`link`|Config the link for the items displayed in the admin column. Can be `view` (click to view item on the front end - default), `edit` (click to edit item), or `false` (no link).


### Bi-directional relationships

While the relationships are registered clearly with the term "from" and "to", the connections are bi-directional. You will be able to query back and forth without any problem. The query API is explained in the next section.

The data is stored in the database as a pair of (from_id, to_id), thus making it independent from either side.

## Getting connected items

### API

Using the API is the fastest and simplest way to get connected items:

```php
$pages = MB_Relationships_API::get_connected( [
    'id'   => 'posts_to_pages',
    'from' => get_the_ID(),
] );
foreach ( $pages as $p ) {
    echo $p->post_title;
}
```

If you need more control on connected items (like sorting, limiting the number of items), see the sections below for each type of content.

### Posts

To get pages that are connected from a specific post (the *Basic Usage* example), use the following code:

```php
$connected = new WP_Query( [
    'relationship' => [
        'id'   => 'posts_to_pages',
        'from' => get_the_ID(), // You can pass object ID or full object
    ],
    'nopaging'     => true,
] );
while ( $connected->have_posts() ) : $connected->the_post();
    ?>
    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
    <?php
endwhile;
wp_reset_postdata();
```

To query for connected posts, just pass another parameter `relationship` to `WP_Query()`.

If you want to display posts that connected to a specific page (the **backward query**), then just replace `from` by `to` in the code above:

```php
$connected = new WP_Query( [
    'relationship' => [
        'id' => 'posts_to_pages',
        'to' => get_the_ID(), // You can pass object ID or full object
    ],
    'nopaging'     => true,
] );
```

That's all.

**So, why WP_Query() you might ask?**

There are 3 reasons that we want to use `WP_Query()`:

1. Using `WP_Query()` allows developers to create a **flexible** query to the database. Imagine you want to get related posts (which are set manually by the plugin) *and* in the same category. `WP_Query()` allows you to do that easily. Without it, you probably need to create 2 manual queries (1 from a relationship, 1 from a category).
1. `WP_Query()` is optimized for getting posts. It creates **only 1 query** to the database. Besides, in that single query, you'll be able to retrieve **full post objects**, not just post IDs. (You still can retrieve only post IDs if you set `'fields' => 'ids'` - how flexible it is!).
1. `WP_Query()` is so familiar with WordPress developers. No need to introduce another API just for the same purpose.

Also note that, in the example above, we set `nopaging` to `true`, which disables pagination. So the query returns all the connected posts.

For the full list of supported parameters for `WP_Query()`, please see the [documentation](https://developer.wordpress.org/reference/classes/wp_query/).

### Terms

Similar to posts, getting connected terms is simple:

```php
$terms  = get_terms( [
    'taxonomy'     => 'category',
    'hide_empty'   => false,
    'relationship' => [
        'id' => 'categories_to_posts',
        'to' => get_the_ID(), // You can pass object ID or full object
    ],
] );
foreach ( $terms as $term ) {
    echo $term->name;
}
```

We use WordPress function `get_terms()` with an additional parameter `relationship` with the same reasons as for posts.

For the full list of supported parameters for `get_terms()`, please see the [documentation](https://developer.wordpress.org/reference/functions/get_terms/).

### Users

Similar to posts, getting connected users is simple:

```php
$users  = get_users( [
    'relationship' => [
        'id' => 'users_to_posts',
        'to' => get_the_ID(), // You can pass object ID or full object
    ],
] );
foreach ( $users as $user ) {
    echo $user->display_name;
}
```

We use WordPress function `get_users()` with an additional parameter `relationship` with the same reasons as for posts.

For the full list of supported parameters for `get_users()`, please see the [documentation](https://codex.wordpress.org/Function_Reference/get_users).

### Syntax

The `relationship` parameter for querying accepts the following parameters:

Name|Description
---|---
`id`|The relationship ID.
`from`|The object(s) that you want to get connected items from. Accept single or array of object(s) or object ID(s).
`to`|The object(s) that you want to get connected items to. Accept single or array of object(s) or object ID(s).

**How to get the ID of the current item**

In the examples above, we use `get_the_ID()` to get the ID of the current post. But if we query for connected posts from a relationship `terms_to_posts`, then that function doesn't work.

In that case, we need to use the following functions:

Function|Description
---|---
[`get_queried_object()`](https://codex.wordpress.org/Function_Reference/get_queried_object)|Get the current-queried object. If you're on a single post/page, it will return the post object. If you're on a category archive, it will return the category object and so on. Note that in the code above, `from` and `to` accepts both object ID and full object.
[`get_queried_object_id()`](https://developer.wordpress.org/reference/functions/get_queried_object_id/)|Get the current-queried object ID. Similar to the above function but returns only object ID.
[`get_current_user_id()`](https://developer.wordpress.org/reference/functions/get_current_user_id/)|Get current user ID.

## Getting sibling items

Assume you have 2 custom post types: student and class. Each student can join 1 or more classes (many-to-many relationship). Now how to get the classmate of the given student A?

Since version 1.2.0, the plugin introduces new API to get sibling items. To get sibling of a post, simply add `'sibling' => true` to the query as follows:

```php
$siblings = new WP_Query( [
    'relationship' => [
        'id'      => 'posts_to_pages',
        'to'      => get_the_ID(),
        'sibling' => true,
    ],
    'nopaging'     => true,
] );
```

The code is similar to the above section, except the the extra `sibling` parameter. That parameter works for all posts, terms, or users queries.

## Post archive

All the examples above work well with a single post, term, or user. But if you want to display connected posts on the blog archive page, this method will create a dozen of queries for each post on the archive page. That's a lot of extra queries.

To solve this problem, we need to use the following code:

```php
global $wp_query, $post;

MB_Relationships_API::each_connected( [
    'id'   => 'posts_to_pages',
    'from' => $wp_query->posts, // 'from' or 'to'.
] );

while ( have_posts() ) : the_post();

    // Display connected pages
    foreach ( $post->connected as $p ) :
        echo $p->post_title;
        // More core here...
    endforeach;

endwhile;
```

### How does it work?

On each request, WordPress automatically runs a query that finds the appropriate posts to display. These posts are stored in the global `$wp_query` variable.

The API function `MB_Relationships_API::each_connected()` will take a list of posts from `$wp_query->posts` and pull the related pages from the database (with a single database query) and assign them to each post via the `connected` property. So, you can loop through `$post->connected` and display connected pages.

If you create a custom query than default WordPress query, just pass the array of objects to the function, like this:

```php
$my_query = new WP_Query( [
    // your parameters
] );

MB_Relationships_API::each_connected( [
    'id'   => 'posts_to_pages',
    'from' => $my_query->posts, // Set to $my_query.
] );

while ( $my_query->have_posts() ) : $my_query->the_post();

    // Display connected pages
    foreach ( $post->connected as $p ) :
        echo $p->post_title;
        // More code here.
    endforeach;

endwhile;
```

The property name can be set to anything with an additional `'property' => 'your_property_name'`. See the below sections.

### Multiple connections

If you create multiple relationships between objects, you still can manipulate the query multiple time, like this:

```php
// Get connected pages and assign to property 'connected_pages'.
MB_Relationships_API::each_connected( [
    'id'       => 'posts_to_pages',
    'from'     => $wp_query->posts,
    'property' => 'connected_pages',
] );

// Get connected users and assign to property 'artists'.
MB_Relationships_API::each_connected( [
    'id'       => 'users_to_posts',
    'from'     => $wp_query->posts,
    'property' => 'artists',
] );

while ( have_posts() ) : the_post();

    // Display connected pages
    foreach ( $post->connected_pages as $post ) : setup_postdata( $post );
        the_title();
        ...
    endforeach;
    wp_reset_postdata(); // Set $post back to original post

    // Displayin connected users
    foreach ( $post->artists as $artist ) :
        echo $artist->display_name;
    endforeach;

endwhile;
```

### Nesting

Since the `each_connected()` function accepts array of post objects, it's easy to create nested query like this:

```php
$my_query = new WP_Query( [
    'post_type' => 'movie'
] );
MB_Relationships_API::each_connected( [
    'id'       => 'movies_to_actors',
    'from'     => $my_query->posts,
    'property' => 'actors',
] );

while ( $my_query->have_posts() ) : $my_query->the_post();

    // Another level of nesting
    MB_Relationships_API::each_connected( [
        'id'       => 'actors_to_producers',
        'from'     => $post->actors,
        'property' => 'actors',
    ] );

    foreach ( $post->actors as $post ) : setup_postdata( $post );
        echo '<h3>Connected Producers</h3>';

        foreach ( $post->producers as $post ) : setup_postdata( $post );
            the_title();

            ...
        endforeach;
    endforeach;

    wp_reset_postdata();
endwhile;
```

## Query by multiple relationships

For example, you have event-to-band and event-to-artist relationships and you want to get all bands and artists that connected from an event, then you can do the following:

```php
$query = new WP_Query( [
    'relationship' => [
        'relation' => 'OR',
        [
            'id'   => 'events_to_bands',
            'from' => get_the_ID(),
        ],
        [
            'id'   => 'events_to_artists',
            'from' => get_the_ID(),
        ],
    ],
    'nopaging'     => true,
] );
while ( $query->have_posts() ) {
    $query->the_post();
    echo get_the_title() . '<br>';
}
wp_reset_postdata();
```

## Creating connections programmatically

The plugin has several public APIs that can help you create or delete connections between 2 items using code.

### `has`

This function checks if 2 objects have a specific relationship.

```php
$has_connection = MB_Relationships_API::has( $from, $to, $id );
if ( $has_connection ) {
    echo 'They have a relationship.';
} else {
    echo 'No, they do not have any relationship.';
}
```

Name|Description
---|---
`$from`|The ID of "from" object.
`$to`|The ID of "to" object.
`$id`|The relationship ID.

### `add`

This function adds a specific relationship for 2 objects.

```php
MB_Relationships_API::add( $from, $to, $id, $order_from = 1, $order_to = 1 );
```

This function checks if the 2 objects already have a relationship and adds a new relationship only if they haven't.

When calling `add` function, the plugin fires a hook as follow:

```php
do_action( 'mb_relationships_add', $from, $to, $id, $order_from, $order_to );
```

### `delete`

This function deletes a specific relationship for 2 objects.

```php
MB_Relationships_API::delete( $from, $to, $id );
```

This function checks if the 2 objects already have a relationship and delete that relationship only if they have.

When calling `add` function, the plugin fires a hook as follow:

```php
do_action( 'mb_relationships_delete', $from, $to, $id );
```

## Shortcode

The plugin provides a single flexible shortcode to display connected items.

```php
[mb_relationships id="posts_to_pages" direction="from" mode="ul"]
```

It accepts the following parameters:

Name|Description
---|---
`id`|Relationship ID. Required.
`items`|List of items for getting connected items from/to. Optional. If missed, the shortcode will get the current object ID.
`direction`|Get connected items `from` (default) or `to`. Optional.
`mode`|How to display connected items? `ul` (unordered list - default), `ol` (ordered list) or `inline`.
`separator`|The separator between connected items if `mode` is set to `inline`. Optional.

## Database

The relationship data is stored in a single database `mb_relationships` with the following columns:

Column|Description
---|---
`ID`|The connection ID
`from`|The ID of the "from" object
`to`|The ID of the "to" object
`type`|The relationship ID (type)
`order_from`|The order if the item for the "from" side
`order_to`|The order if the item for the "to" side

This structure allows us to create simple and efficient queries. All columns are also indexed to optimize for speed.

If you use the extension as a separated plugin, e.g. not bundle it within another, then the table is created during plugin activation. It's the ideal situation, where the plugin only checks for table existence only once.

If you bundle the extension within another plugin, then the table is checked and created when it's loaded. While the check is relatively fast, it's still an extra small query to the database.
