#summary An overview of the rule language
== JSONRule Metamodel==

http://hydrogen.informatik.tu-cottbus.de/wiki/images/6/6d/JSONRuleLang.png

|| [EventExpressions] ||
|| [Conditions] ||
|| [Actions] ||

== A First Example ==

'''Rule:''' On any occurrence of a <em>click</em> event on an element with class <em>note</em> having as first child a <em>ul</em> element, change the first child background color to <em>blue</em>.
<pre>
{
 "id":"rule101",
 "appliesTo": ["http://www.yahoo.com", "http://www.google.com/"],
 "eventExpression": { "eventType": "click",
                       "eventTarget": "$X"
                     },
 "conditions": [
    "$X:Element( class == 'note',$Y:firstChild)",
    "$Y.tagName == 'ul'",
    ],
 "actions":
   ["changeBackground($Y, 'blue')"]
}
</pre>

The above example shows that the rule is a JSON object with the following properties:
 * <em>id</em> - a required string-valued attribute. The identified of the rule. This is unique in the scope of a rule set  
 * <em>appliesTo</em> - a required array containing the URL's of the pages on which this rule will apply. If this array is empty then rule will be never executed.
 * <em>eventExpression</em> -  an optional property capturing the triggering event for this rule. Its value is a JSON object with the following structure:
 ** <em>eventType</em> - a string-valued attribute.  Its value is the identification string of any DOM Event types (such as <em>load</em> or <em>mousedown</em> or <em>DOMNodeInserted</em> ...)
 ** <em>eventTarget</em> - a property capturing the target of the corresponding event type. It value is a [JSONTerm] capturing this target. In the above example  the <em>eventTarget</em> value is a _rule variable_ bound to the DOM element on which the event occurs.
 * <em>conditions</em> - a required array encoding rule conditions. If this array is empty, then by default the conditions will be evaluated to <em>true</em>.
 * <em>actions</em> - a required array of !JavaScript function calls. These actions will be executed sequentially using the array default order. If this array is empty, no function call is performed.