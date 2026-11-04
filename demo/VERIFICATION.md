# Verification

Checked on 4 November 2026.

## Current version: 1.2

- Production bundle: `npm run build` — passed.
- iOS asset and plugin synchronization: `npm run ios:sync` — passed.
- Signed physical-iPhone build: `xcodebuild` for the App scheme, Debug configuration, and iOS destination — **BUILD SUCCEEDED**.
- Browser verification: `npm test` — **22 passed** in desktop Chrome and an iPhone-sized touch viewport.

The checks cover:

- Multiple announcements in every built-in community, including community-specific internships.
- Different content in subgroups and replies stored independently per group.
- The complete guided internship flow, source navigation, saves, reminders, and calendar download.
- Communities excluded by default; only selected sources and matching interests contribute to the feed.
- Custom interests, custom local communities, sports matching, and persistence.
- Migration from the original default-included community settings while retaining saved opportunities.
- Dark-mode persistence and preservation of personal source choices during the sample demo.
- Safe display of typed messages and custom community names, dialog focus, and viewport sizing.

## Native device history

Version 1.1 was installed and launched successfully on the project owner’s iPhone 16 Pro. The initial installation required freeing a free-developer app slot; Sidequest was removed only after explicit user authorization. Later SignalFeed updates retain the same bundle identifier and do not require removing other apps.

The simulator build originally stalled during Xcode asset compilation. The physical-device build subsequently succeeded. Native calendar sharing and all native screens have not been independently visually verified.

## Limits

The mobile browser checks emulate an iPhone viewport; they are not physical-device Safari tests. All community content, employers, opportunities, and relevance scores are fictional. AI extraction, OCR, deduplication, and background notifications are simulated. Calendar exports contain the fixed demo dates in November 2026.
