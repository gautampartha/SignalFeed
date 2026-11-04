# The internship story · 90-second live demo

Before presenting, run `npm run dev`, open `http://localhost:5180/?demo`, and use a desktop browser at roughly 1440 × 1050 or full screen. On mobile, use the Next button in the green tour bar. On desktop, use the presenter panel to the right of the phone. Scroll inside the phone when necessary.

All names, companies, messages, and opportunities are fictional. The product behavior is interactive; the AI extraction is simulated. Date context: 4 November 2026, IST.

## 0–15 seconds · The problem

**Screen:** familiar WhatsApp-style Chats.

“We join college communities to find opportunities. Then 1,284 messages arrive. Somewhere between the greetings, links, and discussions is a paid internship we actually want. Most of us won’t find it in time.”

Click **Open the community** in the presenter panel.

## 15–30 seconds · The buried opportunity

**Screen:** Design Circle. Riya’s original poster and caption are highlighted.

“Here it is: a Product Design Internship at Forma. It pays ₹30,000 a month, it’s remote, and it closes on 6 November. But that useful information is scattered across a poster and its caption, inside a busy group.”

Click **Find the signal**. Let the simulated extraction complete.

## 30–50 seconds · The feature

**Screen:** SignalFeed, with the structured internship card.

“SignalFeed is a personal information layer inside WhatsApp. Choose your communities and interests. It extracts the opportunity, identifies eligibility and deadlines, and brings the useful details into one card. This internship was shared in three communities. You only see it once.”

Scroll inside the phone to show the stipend, deadline, and **3 sources · merged** label. The source button opens the original message if judges ask about trust. **View opportunity** shows eligibility and duration; close the sheet to continue.

## 50–65 seconds · The next step

Click **Save this opportunity** in the presenter panel.

“Discovery should lead to action. I can save it to a shortlist so I don’t have to search my messages again.”

Click **Set a reminder**.

## 65–80 seconds · The reminder

**Screen:** reminder sheet with 48-hour, 24-hour, and two-hour options.

“SignalFeed already knows the deadline. I’ll choose a day before, so I have time to polish my portfolio. The local reminder is saved, and I can add a real event to my calendar.”

Click **Set my reminder** inside the phone. Optionally click **Add to my calendar** to show the `.ics` download; importing it is optional during the pitch.

## 80–90 seconds · The payoff

**Screen:** reminder confirmation.

“From 1,284 messages to one relevant internship, a saved opportunity, and a clear next step. SignalFeed: never miss an opportunity hidden in a conversation.”

## If judges want to explore

- **Communities:** turn a source off, then return to SignalFeed. Opportunities only remain if another selected source shared them.
- **You → Interests:** turn off Internships to show personalization. Turn it back on after the demonstration.
- **Search:** enter `React` to isolate the engineering internship, or `Forma` to return to the featured role.
- **Saved / Reminders:** demonstrate that data survives refresh.
- **Chats:** open a conversation and send a mock message; it stays on this device.
- **Camera button in Chats:** inspect the sample poster and trigger its simulated extraction.
- **You → Reset demo data:** clears local state after confirming. The guided demo can also be replayed without clearing saved items.

## Honest answers to likely technical questions

**“Does this read my WhatsApp groups?”**

“This prototype uses mock messages. Real group access depends on supported platform permissions and a permitted integration; we’re not claiming unrestricted access to personal groups.”

**“Is the AI live?”**

“The hackathon demo simulates the extraction pipeline with predefined results. It demonstrates the experience and information model. A live classifier, OCR system, extraction service, and scheduler would be the next implementation layer.”

**“What actually works today?”**

“The complete frontend: source selection, interest filtering, conversations, source navigation, saving, reminder management, persistence, and calendar export. It also runs inside an iOS WKWebView.”

**“Why is this more than a chat summary?”**

“The output is a personalized, deduplicated opportunity with an actionable deadline and a traceable original source. It connects discovery with follow-through.”

**“Can the app notify me in the background?”**

“Background push is simulated. The reminder is stored locally, and the calendar export creates an event you can import with a calendar alert. A production notification scheduler remains to be built.”
