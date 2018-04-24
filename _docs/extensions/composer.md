---
title: Composer
---

This documentation will show you how to install [Meta Box extensions](https://metabox.io/plugins) via Composer.

If you haven't known about [Composer](https://getcomposer.org), then it is a package dependency manager for PHP. The core Meta Box plugin [already supports Composer](/composer/). And so do its extensions.

## Setup

To use Composer to install Meta Box extensions, please add `repositories` rule to your `composer.json`:

```json
"repositories": [{
  "type": "composer",
  "url": "https://packages.metabox.io/YOUR_API_KEY"
}],
```

Please note that **you need an active API Key** to use Meta Box extensions with Composer. Go to [My Account](https://metabox.io/my-account/) page to get your API Key.

If your license has expired, please renew it. If you don't have any, then you need to purchase [an extension](https://metabox.io/plugins/) or [a bundle of extensions](https://metabox.io/pricing/).

The system automatically checks if your license is still active. If yes, then you'll granted access via Composer to Meta Box's packages. It also ensures you have access to only extensions you purchased.

## Usage 

To include extensions via Composer, simply add them as dependencies like this:

```json
"require": {
  "meta-box/meta-box-group": "dev-master",
  "meta-box/meta-box-columns": "dev-master",
  "meta-box/mb-settings-page": "dev-master",
}
```

So, your final `composer.json` will be:

```json
{
  "repositories": [{
    "type": "composer",
    "url": "https://packages.metabox.io/YOUR_API_KEY"
  }],
  "require": {
    "meta-box/meta-box-group": "dev-master",
    "meta-box/meta-box-columns": "dev-master",
    "meta-box/mb-settings-page": "dev-master",
  }
}
```

**Important note:** the version of extensions specified in `composer.json` *must* be `dev-master`. We don't support version constrains for Meta Box extensions yet. You always use the latest version.

To install the extensions, simply run:

```bash
composer install
```

Alternatively, you can install the extensions via command line without editing `composer.json`:

```bash
composer require meta-box/meta-box-group:dev-master
```

The extensions then will be installed in the WordPress's `wp-content/plugins` directory, instead of the traditional `vendor` folder thanks to [composer/installers](https://github.com/composer/installers). `composer/installers` is a powerful package that allows us to change the install path of packages to the specific folder we want. And by default, all Meta Box extensions have type `wordpress-plugin` and are installed in `wp-content/plugins`. For more information about `composer/installers`, please read [this guide](https://github.com/composer/installers).

To make the extensions work, simply load Composer's autoload file:

```php
require 'vendor/autoload.php';
```

Now Meta Box extensions are available in your plugin/theme and you can start using them!
