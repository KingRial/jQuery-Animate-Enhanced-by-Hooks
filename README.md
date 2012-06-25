jQuery Animate enhanced by Hooks v0.0.4
=================
"jQuery Animate enhanced by Hooks" is a jQuery Plugin to let animate function (http://api.jquery.com/animate/) to use CSS3 feature when possible.
By using CSS3 features like transition, translate or translate3d, this plugin will let better performances during animation on all the systems, especially on mobiles.
The entire plugin is based on jQuery Hooks (http://api.jquery.com/jQuery.cssHooks/) and it requires jQuery 1.4.3+ version to be used.

License
-------
Copyright 2012, Riccardo Re

Dual licensed under the MIT or GPL Version 2 licenses.

<http://jquery.org/license>

Notes
-----
After using for a long time the jQuery-Animate-Enhanced from Ben Barnett (http://github.com/benbarnett/jQuery-Animate-Enhanced), I met some problems: the jquery queues for animations weren't compatible with the plugin.
I tried to patch such great library without success, so I decided to create my own plugin trying to build a less complex solution withing the jQuery environment.

Special Thanks to:
Ben Barnett for http://github.com/benbarnett/jQuery-Animate-Enhanced
louisremi for https://github.com/louisremi/jquery.transition.js/

Improvements
-----
A lot of improvements can still be done; for example adding more css transformations or let the plugin using the easings set into animate function.

Change Log
----------
 * __0.0.4__
  - Faking scrollLeft/scrollTop animation using CSS3, and position absolute/relative of the container and the contained element
 * __0.0.3__
  - Typos and minor fixes
 * __0.0.2__
  - Commited on Git Hub first release