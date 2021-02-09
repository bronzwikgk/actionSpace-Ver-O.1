#summary Event expressions are related to the Event interface specification in Document Object Model.

== What is an Event Expression ==

In [http://code.google.com/p/jsonrules/wiki/RuleLanguage JSON Rules] an !*EventExpression* is a JSON object with the following properties (with the same meaning as in the W3C DOM Events specification):
 * _eventType_ - is a string attribute capturing the type of the event. This event type can be a DOM Event type (See [http://www.w3.org/TR/DOM-Level-3-Events/events.html#Events-EventTypes-complete List of Complete Event Types]) but also a user-defined !JavaScript event.
 * _eventTarget_ - is a [JSONTerm]. When the event type is a user-defined JavaScript event, the target can be any !JavaScript object in JSON notation. 

== How are they used ==
Properties of event expressions are matched  at the run time against the incoming DOM events or user-defined events. Their values are used in the rule conditions and actions.
<pre>
 // When a click event occurs, 
 // If the event occurs on an anchor element, and 
 // its href attribute matches a specific regular expression 
 // (rudimentary check that the link is an inbox Yahoo message link) 
 // then call append() with the message subject as parameter.

 {"id":"rule102",
   "appliesTo":["http://mail.yahoo.com/"],
   "eventExpression": { "eventType": "click",
                        "eventTarget": "$X"
                      },
   "conditions":" ["$X:a(href == 'match(showMessage\?fid=Inbox)'"],
   "actions":["append($X.textContent)"]
 }
</pre>