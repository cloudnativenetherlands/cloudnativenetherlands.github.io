# cloudnativenetherlands.nl

The website of Stichting Cloud Native Netherlands, built with Jekyll and published with GitHub Pages.

## Where things are

| What | Where |
| --- | --- |
| Page design (header, menu, footer) | `_layouts/scnn.html`, `assets/css/scnn.css` |
| Home, Events, Board, About, Code of Conduct | `index.html`, `events.html`, `board.html`, `about.html`, `coc.html` |
| Event request form | `event-request.html`, `assets/js/event-request.js` |
| Board members and Supervisory Board | `_data/board.yml` |
| Upcoming and past events | `_data/events.yml` |
| Profile pages | `marcel.html`, `karla.html`, `ronald.html` (layout `_layouts/profile.html`) |
| Detailed support request form the board sends to organizers | `docs/event-support-request-form.md` (not published) |

## Common changes

**Announce an event:** add it under `upcoming` in `_data/events.yml`; the file explains the fields. After the event, move the entry to the top of `past`.

**Change a board member's role or summary:** edit `_data/board.yml`. The longer text on a profile page is in that person's `.html` file.

**Board photos:** add `github: <username>` to a person in `_data/board.yml` to show their GitHub profile picture, which then follows whatever picture they set on GitHub. Without it the image file in `photo` is used.

## Event requests

The form on `/event-request` is a short first request. It opens the visitor's email app with a message to info@cloudnativenetherlands.nl. If the board decides the event fits, it sends the organizer the detailed form in `docs/event-support-request-form.md`.

## Credits

The repository started as a fork of [Beautiful Jekyll](https://github.com/daattali/beautiful-jekyll) (MIT license). The current pages use their own layout and styles.
