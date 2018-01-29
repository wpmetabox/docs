---
title: MB Relationships
---

This documentation will show you how to create relationships between posts, terms, users, and how to display connected items in the frontend.

{% include installation.html %}

## Creating relationships

### Basic usage - Creating posts to pages relationship

The code below registers a relationship from posts to pages. Open your theme's `functions.php` file and add:

```php
add_action( 'mb_relationships_init', function() {
    MB_Relationships_API::register( array(
        'id'   => 'posts_to_pages',
        'from' => 'post',
        'to'   => 'page',
    ) );
} );
```

Note: you need to hook to `mb_relationships_init` to make sure the API is ready for use.

This code will show 2 meta boxes for posts and pages in the editing screens:

- For posts: the meta box to select connected pages.
- For pages: the meta box to show the posts that connect from. You can view the connected posts only and can't edit them. You can hide this meta box if you want (see the *Syntax* section).

Both meta boxes are registered using the *Meta Box* plugin, thus it's flexible and editable. The *Syntax* section will cover some settings for the relationship and meta boxes.

### Creating categories to posts relationship

The following example registers a relationship from categories to posts. The settings for `from` and `to` is a little bit more advanced than above.

```php
add_action( 'mb_relationships_init', function () {
    MB_Relationships_API::register( array(
        'id'   => 'categories_to_posts',
        'from' => array(
            'object_type' => 'term',
            'taxonomy'    => 'category',
        ),
        'to'   => array(
            'object_type' => 'post',
        ),
    ) );
} );
```

### Creating users to posts relationship

The following example registers a relationship from users to posts. It has some advanced settings that we will explain in the *Syntax* section.

```php
add_action( 'mb_relationships_init', function () {
    MB_Relationships_API::register( array(
        'id'   => 'users_to_posts',
        'from' => array(
            'object_type' => 'user',
            'meta_box'    => array(
                'title'       => 'Manages',
                'field_title' => 'Select Posts',
            ),
        ),
        'to'   => array(
            'object_type' => 'post',
            'post_type'   => 'post',
            'meta_box'    => array(
                'title'         => 'Managed By',
                'context'       => 'side',
                'empty_message' => 'No users',
            ),
        ),
    ) );
} );
```

### Syntax

The main API function `MB_Relationships_API::register` has the following parameters:

Name|Description
---|---
`id`|The relationship ID (or type). It's used to identify a relationship from others. Required.
`from`|The "from" side of the relationship. Required. See below for details.
`to`|The "to" side of the relationship. Required. See below for details.

Both sides `from` or `to` accepts various parameters for the connection and meta box.

If you pass **a string** to `from` or `to` (like we did in the *Basic Usage* section above), the plugin will understand that as the **post type**. So the relationship will be created from posts to posts with specific post types.

If you pass **an array** to `from` or `to`, then the array accepts the following parameters:

Name|Description
---|---
`object_type`|The object type the relationship is created from/to. Accepts `post` (default), `term` or `user`. Optional.
`post_type`|If the `object_type` is set to `post`, then specify the `post_type` here. Default `post`. Optional.
`taxonomy`|If the `object_type` is set to `term`, then specify the `taxonomy` here.
`query_args`|Custom query arguments to get objects of `object_type`. These arguments will be passed to `WP_Query()`, `get_terms()` or `get_users()` depending what `object_type` is.
`meta_box`|Meta box settings, which accepts the following parameters:
-- `hidden`|Hide the meta box. `true` or `false` (default). This setting is applied only for "to" side, as we always need to show meta box on the "from" side to select connected items.
-- `context`|Where to show the meta box: `normal`, `advanced` (below post editor) or `side` (on the right sidebar - default). Works only if `object_type` is `post`.
-- `priority`|The meta box priority: `high` (default), `low`.
-- `title`|The meta box title. Default is "Connect To" for "from" side and "Connected From" for "to" side.
-- `field_title`|The field title. Optional.
-- `empty_message`|The message displayed when there's no connections. Used for "to" side only.

### Reciprocal relationships

You can set `from` and `to` to connect from *any* post type, term or user to another. Even set both of them the same, thus creating reciprocal relationships.

The following code create a relationship from posts to posts:

```php
add_action( 'mb_relationships_init', function() {
    MB_Relationships_API::register( array(
        'id'   => 'posts_to_pages',
        'from' => 'post',
        'to'   => 'post',
    ) );
} );
```

When you edit a post, the plugin will show 2 meta box to let you select posts to "Connect To" and display the "Connected From" posts.

This is a difference from the *Posts 2 Posts* plugin, where you have to set another parameter for reciprocal connections. We have been thinking about this and trying to make the API as simple and clear as possible.

### Bi-directional relationships

While the relationships are registered clearly with term "from" and "to", the connections are actually bi-directional. You will be able to query back and forth without any problem. The query API is explained in the next section.

The data is stored in the database as a pair of (from_id, to_id), thus making it independent from either side.

Besides, for each side, there's a meta box that shows what are connected from/to. So you don't have to worry about the direction of the connection anymore.

If you have built the relationships with field `post` or `taxonomy_advanced`, you will see the difference here. The old way is clearly just one-directional relationship from an object type to another. It will be so hard to query or store the items that connect to a specific post.

## Displaying connected items

### Displaying connected posts

To get pages that are connected from a specific post (the *Basic Usage* example), use the following code:

```php
$connected = new WP_Query( array(
    'relationship' => array(
        'id'   => 'posts_to_pages',
        'from' => get_the_ID(), // You can pass object ID or full object
    ),
    'nopaging'     => true,
) );
while ( $connected->have_posts() ) : $connected->the_post();
    ?>
    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
    <?php
endwhile;
wp_reset_postdata();
```

Basically, to query for connected posts, just pass another parameter `relationship` to `WP_Query()`.

If you want to display posts that connected to a specific page (the **backward query**), then just replace `from` by `to` in the code above:

```php
$connected = new WP_Query( array(
    'relationship' => array(
        'id' => 'posts_to_pages',
        'to' => get_the_ID(), // You can pass object ID or full object
    ),
    'nopaging'     => true,
) );
```

That's all.

**So, why WP_Query() you might ask?**

Why don't create a specific API function that get the connected item IDs from the database? Isn't it faster with just one simple query?

There are 3 reasons that we want to use `WP_Query()`:

1. Using `WP_Query()` allows developers to create a **flexible** query to database. Imagine you want to get related posts (which are set manually by the plugin) *and* in the same category. `WP_Query()` allows you to do that easily. Without it, you probably need to create 2 manual queries (1 from relationship, 1 from category).
1. `WP_Query()` is optimized for getting posts. It actually creates **only 1 query** to the database. Besides, in that single query, you'll be able to retrieve **full post objects**, not just post IDs. (You still can retrieve only post IDs if you set `'fields' => 'ids'` - how flexible it is!).
1. `WP_Query()` is so familiar with WordPress developers. No need to introduce another API just for the same purpose.

Also note that, in the example above, we set `nopaging` to `true`, which disable pagination. So the query returns all the connected posts.

For the full list of supported parameters for `WP_Query()`, please see the [documentation](https://codex.wordpress.org/Class_Reference/WP_Query).

### Displaying connected terms

Similar to posts, getting connected terms is simple:

```php
$terms  = get_terms( array(
    'taxonomy'     => 'category',
    'hide_empty'   => false,
    'relationship' => array(
        'id' => 'categories_to_posts',
        'to' => get_the_ID(), // You can pass object ID or full object
    ),
) );
foreach ( $terms as $term ) {
    echo $term->name;
}
```

We use the WordPress's function `get_terms()` with an additional parameter `relationship` with the same reasons as for posts.

For the full list of supported parameters for `get_terms()`, please see the [documentation](https://developer.wordpress.org/reference/functions/get_terms/).

### Displaying connected users

Similar to posts, getting connected users is simple:

```php
$users  = get_users( array(
    'relationship' => array(
        'id' => 'users_to_posts',
        'to' => get_the_ID(), // You can pass object ID or full object
    ),
) );
foreach ( $users as $user ) {
    echo $user->display_name;
}
```

We use the WordPress's function `get_users()` with an additional parameter `relationship` with the same reasons as for posts.

For the full list of supported parameters for `get_users()`, please see the [documentation](https://codex.wordpress.org/Function_Reference/get_users).

### Syntax

The `relationship` parameter for querying accepts the following parameters:

Name|Description
---|---
`id`|The relationship ID.
`from`|The object(s) that you want to get connect items from. Accept single or array of object(s) or object ID(s).
`to`|The object(s) that you want to get connect items to. Accept single or array of object(s) or object ID(s).

**How to get the ID of current item**

In the examples above, we use `get_the_ID()` to get the ID of the current post. But if we query for connected posts from a relationship `terms_to_posts`, then that function doesn't work.

In that case, we need to use the following functions:

Function|Description
---|---
[`get_queried_object()`](https://codex.wordpress.org/Function_Reference/get_queried_object)|Get the current-queried object. If you're on a single post/page, it will return the post object. If you're on a category archive, it will return the category object and so on. Note that in the code above, `from` and `to` accepts both object ID add full object.
[`get_queried_object_id()`](https://developer.wordpress.org/reference/functions/get_queried_object_id/)|Get the current-queried object ID. Similar to the above function but returns only object ID.
[`get_current_user_id()`](https://developer.wordpress.org/reference/functions/get_current_user_id/)|Get current user ID.

## Working with an archive of posts

All the examples above work well with single post, term or user. But if you want to display connected posts in the blog archive page, this method will create a dozen of queries for each post in the archive page. That's a lot of extra queries.

To solve this problem, we need to use the following code:

```php
MB_Relationships_API::each_connected( array(
    'id'   => 'posts_to_pages',
    'from' => $wp_query->posts, // 'from' or 'to'.
) );

while ( have_posts() ) : the_post();

    // Display connected pages
    foreach ( $post->connected as $post ) : setup_postdata( $post );
        the_title();
        ...
    endforeach;
    wp_reset_postdata(); // Set $post back to original post

endwhile;
```

### How does it work?

On each request, WordPress automatically runs a query which finds the appropriate posts to display. These posts are stored in the global `$wp_query` variable.

The API function `MB_Relationships_API::each_connected()` will the take list of posts from `$wp_query->posts` and pull the related pages from the database (with a single database query) and assign them to each post via `connected` property. So, you can loop through `$post->connected` and display connected pages.

If you create a custom query than default WordPress query, just pass the array of objects to the function, like this:

```php
$my_query = new WP_Query( array(
    // your parameters
) );

MB_Relationships_API::each_connected( array(
    'id'   => 'posts_to_pages',
    'from' => $my_query->posts, // Set to $my_query.
) );

while ( $my_query->have_posts() ) : $my_query->the_post();

    // Display connected pages
    foreach ( $post->connected as $post ) : setup_postdata( $post );
        the_title();
        ...
    endforeach;
    wp_reset_postdata(); // Set $post back to original post.

endwhile;
```

The property name can be set to anything with an additional `'property' => 'your_property_name'`. See the below sections.

### Using each_connected() multiple times

If you create multiple relationships between objects, you still can manipulate the query multiple time, like this:

```php
// Get connected pages and assign to property 'connected_pages'.
MB_Relationships_API::each_connected( array(
    'id'       => 'posts_to_pages',
    'from'     => $wp_query->posts,
    'property' => 'connected_pages',
) );

// Get connected users and assign to property 'artists'.
MB_Relationships_API::each_connected( array(
    'id'       => 'users_to_posts',
    'from'     => $wp_query->posts,
    'property' => 'artists',
) );

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
$my_query = new WP_Query( array(
  'post_type' => 'movie'
) );
MB_Relationships_API::each_connected( array(
    'id'       => 'movies_to_actors',
    'from'     => $my_query->posts,
    'property' => 'actors',
) );

while ( $my_query->have_posts() ) : $my_query->the_post();

    // Another level of nesting
    MB_Relationships_API::each_connected( array(
        'id'       => 'actors_to_producers',
        'from'     => $post->actors,
        'property' => 'actors',
    ) );

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

## Creating connections programmatically

The plugin has several public APIs that can help you create or delete connections between 2 items using code.

### `has`

This function checks if 2 objects has a specific relationship.

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
MB_Relationships_API::add( $from, $to, $id );
```

This function checks if the 2 objects already have a relationship and adds a new relationship only if they haven't.

### `delete`

This function deletes a specific relationship for 2 objects.

```php
MB_Relationships_API::delete( $from, $to, $id );
```

This function checks if the 2 objects already have a relationship and delete that relationshp only if they have.

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

This structure allows us to create simple and efficient queries. All columns are also indexed to optimize for speed.

If you use the extension as a separated plugin, e.g. not bundle it within another, then the table is created during plugin activation. It's the ideal situation, where the plugin only checks for table existence only once.

If you bundle the extension within another plugin, then the table is checked and created when it's loaded. While the check is relatively fast, it's still an extra small query to the database.
