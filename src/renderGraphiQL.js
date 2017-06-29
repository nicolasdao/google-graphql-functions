/**
 * Copyright (c) 2017, Neap pty ltd.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * This file incorporates work covered by the following copyright and  
 * permission notice:
 *
 *    Copyright (c) 2015, Facebook, Inc.
 *    All rights reserved.
 *
 *    This source code is licensed under the BSD-style license found in the
 *    LICENSE file in the root directory of this source tree. An additional grant
 *    of patent rights can be found in the PATENTS file in the same directory.
 */

// Current latest version of GraphiQL.
const GRAPHIQL_VERSION = '0.9.3'

// Ensures string values are safe to be used within a <script> tag.
function safeSerialize(data) {
	return data ? JSON.stringify(data).replace(/\//g, '\\/') : 'undefined'
}

/**
 * When the server receives a request which does not Accept JSON, but does
 * Accept HTML, it may present GraphiQL, the in-browser GraphQL explorer IDE.
 *
 * When shown, it will be pre-populated with the result of having executed the
 * requested query.
 */
module.exports = function renderGraphiQL(data) {
	const queryString = data.query
	const variablesString = data.variables ? JSON.stringify(data.variables, null, 2) : null
	const resultString = data.result ? JSON.stringify(data.result, null, 2) : null
	const operationName = data.operationName
	/////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////
	const schemaAST = data.schemaAST
	/////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////

	/* eslint-disable max-len */
	return `<!--
The request to this GraphQL server provided the header "Accept: text/html"
and as a result has been presented GraphiQL - an in-browser IDE for
exploring GraphQL.

If you wish to receive JSON, provide the header "Accept: application/json" or
add "&raw" to the end of the URL within a browser.
-->
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>GraphiQL</title>
  <meta name="robots" content="noindex" />
  <style>
    html, body {
      height: 100%;
      margin: 0;
      overflow: hidden;
      width: 100%;
    }
    <!--  //////////////////////////////////////////////////////////////////////////////////////////////-->
    /* The Modal (background) */
    .modal {
        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 100; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
        width: 100%;
    }

    /* Modal Content/Box */
    .modal-content {
        background-color: #fefefe;
        margin: 2% auto; /* 15% from the top and centered */
        padding: 20px;
        border: 1px solid #888;
        width: 90%; /* Could be more or less, depending on screen size */
        height: 85%;
    }

    /* The Close Button */
    .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }

    .close:hover,
    .close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
    }

    #graphiql_container {
        height: 100%
    }
    <!--  //////////////////////////////////////////////////////////////////////////////////////////////-->
  </style>
  <link href="//cdn.jsdelivr.net/graphiql/${GRAPHIQL_VERSION}/graphiql.css" rel="stylesheet" />
  <script src="//cdn.jsdelivr.net/fetch/0.9.0/fetch.min.js"></script>
  <script src="//cdn.jsdelivr.net/react/15.4.2/react.min.js"></script>
  <script src="//cdn.jsdelivr.net/react/15.4.2/react-dom.min.js"></script>
  <script src="//cdn.jsdelivr.net/graphiql/${GRAPHIQL_VERSION}/graphiql.min.js"></script>
  <!--  //////////////////////////////////////////////////////////////////////////////////////////////-->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="https://neapjs.firebaseapp.com/graphqls2s/0.2.1/graphqls2s.min.js"></script> 
  <script src="https://neapjs.firebaseapp.com/graphx/0.1.1-alpha.0/graphx.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js"></script>
  <!--  //////////////////////////////////////////////////////////////////////////////////////////////-->
</head>
<body>
  <!-- ////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////// -->
  <!-- The Modal -->
  <div id="myModal" class="modal" style="display:none;position: fixed;z-index: 100;width: 100%;background-color: rgba(0,0,0,0.4); height: 100%">

    <!-- Modal content -->
    <div id="graphx_box" class="modal-content">
      <span class="close">&times;</span>
    </div>

  </div>
  <div id="graphiql_container"></div>

  <!-- ////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////// -->
  <script>
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    var schemaAST = ${schemaAST ? JSON.stringify(schemaAST) : null};
    function updateD3Graph(para, resp) {
      setTimeout(function() { 
        if (para && para.query && schemaAST && resp && resp.data) 
          d3Graph = graphx.compileGraphDataToD3(para.query, resp, schemaAST);
          generateGraph(d3Graph); 
      }, 10);
    }
    var d3Graph = null;
    var dataset = null;
    function generateGraph(data) {
      var w = 1000;
      var h = 600;
      var linkDistance = 200;

      var colors = d3.scale.category10();

      var dataset2 = {
          "nodes": [
              {
                  "name": "Brand HyT_Yzr0LGW"
              },
              {
                  "name": "Post SJGYMSALz-"
              },
              {
                  "name": "User SJtMBAUz-"
              },
              {
                  "name": "User HJeFGBCIGW"
              },
              {
                  "name": "User HJ-FfHA8M-"
              },
              {
                  "name": "Post BJHYfSAIGb"
              },
              {
                  "name": "User SyQKzB0UMZ"
              },
              {
                  "name": "User SyEtGSALzW"
              },
              {
                  "name": "Post r1FKzBR8zW"
              },
              {
                  "name": "User H18YzBRUGb"
              },
              {
                  "name": "User HJwtGBA8f-"
              },
              {
                  "name": "User ryOYfSC8GW"
              },
              {
                  "name": "Post rynFzr0Uf-"
              },
              {
                  "name": "User S1qYfH0LMW"
              },
              {
                  "name": "User rJotfSCLzZ"
              },
              {
                  "name": "Post BJkgFzrALfW"
              },
              {
                  "name": "User rJaFfrCIGW"
              },
              {
                  "name": "User H1CtfSRIfW"
              },
              {
                  "name": "Post H1MeFfSALfb"
              },
              {
                  "name": "User BJxxKMrCIzZ"
              },
              {
                  "name": "User SJblKzrRLfZ"
              },
              {
                  "name": "Post ByrlFGBRLG-"
              },
              {
                  "name": "User BkXetGB08fb"
              },
              {
                  "name": "User HJNetfSCUM-"
              },
              {
                  "name": "Post HJ5lFzrAUGW"
              },
              {
                  "name": "User ryIetGr08zW"
              },
              {
                  "name": "User HyDeKzHCIMZ"
              },
              {
                  "name": "User H1uxKzSCLzW"
              },
              {
                  "name": "User HyYgKGS0IM-"
              },
              {
                  "name": "Post ry1ZKzHCIMb"
              },
              {
                  "name": "User ryietGSCUMb"
              },
              {
                  "name": "User S12gYzH0UzZ"
              },
              {
                  "name": "User rJTgtGS0LG-"
              },
              {
                  "name": "User SyRgFzSC8GZ"
              },
              {
                  "name": "Post HkfZYfBAIz-"
              },
              {
                  "name": "User BkxZYGBCUG-"
              },
              {
                  "name": "User rJWWYMB0Izb"
              },
              {
                  "name": "Post HJr-YfH0LfZ"
              },
              {
                  "name": "User SyXZKMBAIfb"
              },
              {
                  "name": "User rkEWtzSRLfb"
              },
              {
                  "name": "Post r1_WtfBAUzZ"
              },
              {
                  "name": "User ryL-YMHC8f-"
              },
              {
                  "name": "User ByvWYGHCUGZ"
              },
              {
                  "name": "Post HkiWKMrAUGZ"
              },
              {
                  "name": "User BJFWtfS0UzW"
              },
              {
                  "name": "User rJ9WtGSA8Mb"
              },
              {
                  "name": "Post Hk1MFzB0IGZ"
              },
              {
                  "name": "User ry2-KfH0LMb"
              },
              {
                  "name": "User BJp-FGBALMZ"
              },
              {
                  "name": "User ByA-YMHCUGZ"
              },
              {
                  "name": "Post SJzMtfBCIMW"
              },
              {
                  "name": "User rJgzKzSA8GZ"
              },
              {
                  "name": "User SkbGFMrCIz-"
              },
              {
                  "name": "Post rJSfYMr0IfW"
              },
              {
                  "name": "User HyXztzBRUMW"
              },
              {
                  "name": "User HJNGFGBCLfZ"
              },
              {
                  "name": "Post ByufYzBCUGW"
              },
              {
                  "name": "User H1IGKMBCUfZ"
              },
              {
                  "name": "User S1PGKfSAUzb"
              },
              {
                  "name": "Post r1ifFGB0Uf-"
              },
              {
                  "name": "User HytfFzSALGZ"
              },
              {
                  "name": "User B1qfFMr0IMZ"
              },
              {
                  "name": "Post B1CGFGB08f-"
              },
              {
                  "name": "User rJhGtfHA8M-"
              },
              {
                  "name": "User HkaGKMSAIMW"
              },
              {
                  "name": "Post HyWXYMSCUfW"
              },
              {
                  "name": "User HkJmFMSA8fW"
              },
              {
                  "name": "User SJgmKMSCLfb"
              },
              {
                  "name": "Post Hk47tfS0LMW"
              },
              {
                  "name": "User S1GQKGrR8fW"
              },
              {
                  "name": "User r1XXtfB0IfZ"
              },
              {
                  "name": "Post BkPXYGSA8Gb"
              },
              {
                  "name": "User ryH7YfrCLGW"
              },
              {
                  "name": "User HJ8mYGSR8zZ"
              },
              {
                  "name": "Post S1q7YfHAUzW"
              },
              {
                  "name": "User BydmFfBC8MZ"
              },
              {
                  "name": "User HJY7tGHRIzW"
              },
              {
                  "name": "Post rJTQKfBR8M-"
              },
              {
                  "name": "User HJj7Kzr0Uf-"
              },
              {
                  "name": "User B1nXtGH0Lfb"
              },
              {
                  "name": "Post SylVtGSALM-"
              },
              {
                  "name": "User ByA7tMHAIMb"
              },
              {
                  "name": "User B1J4YGHRIGW"
              },
              {
                  "name": "Post SJX4tGSR8GW"
              },
              {
                  "name": "User B1bVKMr0LG-"
              },
              {
                  "name": "User rkG4FMB08fb"
              },
              {
                  "name": "Post rJUVKMSA8G-"
              },
              {
                  "name": "User BJ44KfHAUMb"
              },
              {
                  "name": "User ryH4tGBCLMZ"
              },
              {
                  "name": "Post SkFVYGSR8zW"
              },
              {
                  "name": "User SkPEFzSR8z-"
              },
              {
                  "name": "User HkuEtfBALzW"
              },
              {
                  "name": "Post BJ3EKMrCIfb"
              },
              {
                  "name": "User Sk54YfS0Ufb"
              },
              {
                  "name": "User SJsEFfHALzb"
              },
              {
                  "name": "Post Sy1BtzrRUG-"
              },
              {
                  "name": "User B16NFzBRIz-"
              },
              {
                  "name": "User rJREtMrCUz-"
              },
              {
                  "name": "Post ryMBKfBC8fW"
              },
              {
                  "name": "User SkgSKMrCUGZ"
              },
              {
                  "name": "User H1WStzBCIf-"
              },
              {
                  "name": "Post rkrSYGHCLMZ"
              },
              {
                  "name": "User HJmHKzSR8fW"
              },
              {
                  "name": "User S14HKMrAIGW"
              },
              {
                  "name": "Post Sy_StGSCLzb"
              },
              {
                  "name": "User BJ8rKMrCLzb"
              },
              {
                  "name": "User S1wHYMHAIG-"
              },
              {
                  "name": "Post SyorKMHAIzZ"
              },
              {
                  "name": "User HkFHKzHRIGb"
              },
              {
                  "name": "User Sy9rFfS08f-"
              },
              {
                  "name": "Post BJyItfHCUGW"
              },
              {
                  "name": "User SJ2HKzHCLfW"
              },
              {
                  "name": "User SkpBtzrA8z-"
              },
              {
                  "name": "User ryAHtzBA8fb"
              },
              {
                  "name": "Post HyGUKfHA8Mb"
              },
              {
                  "name": "User Hyl8YfB0Ufb"
              },
              {
                  "name": "User SkbIYfBAIzb"
              },
              {
                  "name": "Post Hkr8YGS08fZ"
              },
              {
                  "name": "User r17IFGr0LMW"
              },
              {
                  "name": "User r1VIYMSRUfZ"
              },
              {
                  "name": "Post B1uItMr0UMW"
              },
              {
                  "name": "User HJ8UKMBAIMW"
              },
              {
                  "name": "User rkPIFzSR8fb"
              },
              {
                  "name": "Post rJoUKzHCIMZ"
              },
              {
                  "name": "User SkY8FMrA8zZ"
              },
              {
                  "name": "User H1qItGB0IMZ"
              },
              {
                  "name": "Post H1AIYzHRLz-"
              },
              {
                  "name": "User S12IKGrCUzZ"
              },
              {
                  "name": "User rkTIYfBA8fZ"
              },
              {
                  "name": "Post H1ZvFMrR8fZ"
              },
              {
                  "name": "User BykPFfrRUfb"
              },
              {
                  "name": "User B1ePtzS0IM-"
              },
              {
                  "name": "Post HyVPtGBRIfb"
              },
              {
                  "name": "User rkfwFzBRIfW"
              },
              {
                  "name": "User BkQDKfH08Gb"
              },
              {
                  "name": "Post SkDwFMrR8zZ"
              },
              {
                  "name": "User rkrDtzHRIMZ"
              },
              {
                  "name": "User r1LvKGB08zW"
              },
              {
                  "name": "Post r1cvKMBRLf-"
              },
              {
                  "name": "User ryuDYfSRUMW"
              },
              {
                  "name": "User S1KvKMH08f-"
              },
              {
                  "name": "Post SypwtGB0If-"
              },
              {
                  "name": "User SJjwtzHCUzZ"
              },
              {
                  "name": "User BJnwFfBA8GZ"
              },
              {
                  "name": "Post ryeOtfBA8zb"
              },
              {
                  "name": "User SyCvKfB0Uz-"
              },
              {
                  "name": "User rJ1OYGBRIzb"
              },
              {
                  "name": "Post H1muFfHRIzZ"
              },
              {
                  "name": "User H1WOYzS0IMZ"
              },
              {
                  "name": "User rkfutfHCIzW"
              },
              {
                  "name": "Post rJ8OYGSCLMZ"
              },
              {
                  "name": "User SJVutzSAUMZ"
              },
              {
                  "name": "User HkBOYzr0IGb"
              },
              {
                  "name": "Post rkK_YMHRLGW"
              },
              {
                  "name": "User Hyw_tGS0LM-"
              },
              {
                  "name": "User rkudtfSR8zW"
              },
              {
                  "name": "Post HJ2_KzSR8fZ"
              },
              {
                  "name": "User HJ9uYGB0Lz-"
              },
              {
                  "name": "User BksutfHCUMW"
              }
          ],
          "edges": [
              {
                  "source": 1,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 5,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 8,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 12,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 15,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 18,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 21,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 24,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 29,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 34,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 37,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 40,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 43,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 46,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 50,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 53,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 56,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 59,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 62,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 65,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 68,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 71,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 74,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 77,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 80,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 83,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 86,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 89,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 92,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 95,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 98,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 101,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 104,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 107,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 110,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 114,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 117,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 120,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 123,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 126,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 129,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 132,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 135,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 138,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 141,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 144,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 147,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 150,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 153,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 156,
                  "target": 0,
                  "name": "ABOUT"
              },
              {
                  "source": 2,
                  "target": 1,
                  "name": "CREATED"
              },
              {
                  "source": 3,
                  "target": 1,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 4,
                  "target": 1,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 6,
                  "target": 5,
                  "name": "CREATED"
              },
              {
                  "source": 7,
                  "target": 5,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 9,
                  "target": 8,
                  "name": "CREATED"
              },
              {
                  "source": 10,
                  "target": 8,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 11,
                  "target": 8,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 13,
                  "target": 12,
                  "name": "CREATED"
              },
              {
                  "source": 14,
                  "target": 12,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 16,
                  "target": 15,
                  "name": "CREATED"
              },
              {
                  "source": 17,
                  "target": 15,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 19,
                  "target": 18,
                  "name": "CREATED"
              },
              {
                  "source": 20,
                  "target": 18,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 22,
                  "target": 21,
                  "name": "CREATED"
              },
              {
                  "source": 23,
                  "target": 21,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 25,
                  "target": 24,
                  "name": "CREATED"
              },
              {
                  "source": 26,
                  "target": 24,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 27,
                  "target": 24,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 28,
                  "target": 24,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 30,
                  "target": 29,
                  "name": "CREATED"
              },
              {
                  "source": 31,
                  "target": 29,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 32,
                  "target": 29,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 33,
                  "target": 29,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 35,
                  "target": 34,
                  "name": "CREATED"
              },
              {
                  "source": 36,
                  "target": 34,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 38,
                  "target": 37,
                  "name": "CREATED"
              },
              {
                  "source": 39,
                  "target": 37,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 41,
                  "target": 40,
                  "name": "CREATED"
              },
              {
                  "source": 42,
                  "target": 40,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 44,
                  "target": 43,
                  "name": "CREATED"
              },
              {
                  "source": 45,
                  "target": 43,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 47,
                  "target": 46,
                  "name": "CREATED"
              },
              {
                  "source": 48,
                  "target": 46,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 49,
                  "target": 46,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 51,
                  "target": 50,
                  "name": "CREATED"
              },
              {
                  "source": 52,
                  "target": 50,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 54,
                  "target": 53,
                  "name": "CREATED"
              },
              {
                  "source": 55,
                  "target": 53,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 57,
                  "target": 56,
                  "name": "CREATED"
              },
              {
                  "source": 58,
                  "target": 56,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 60,
                  "target": 59,
                  "name": "CREATED"
              },
              {
                  "source": 61,
                  "target": 59,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 63,
                  "target": 62,
                  "name": "CREATED"
              },
              {
                  "source": 64,
                  "target": 62,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 66,
                  "target": 65,
                  "name": "CREATED"
              },
              {
                  "source": 67,
                  "target": 65,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 69,
                  "target": 68,
                  "name": "CREATED"
              },
              {
                  "source": 70,
                  "target": 68,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 72,
                  "target": 71,
                  "name": "CREATED"
              },
              {
                  "source": 73,
                  "target": 71,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 75,
                  "target": 74,
                  "name": "CREATED"
              },
              {
                  "source": 76,
                  "target": 74,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 78,
                  "target": 77,
                  "name": "CREATED"
              },
              {
                  "source": 79,
                  "target": 77,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 81,
                  "target": 80,
                  "name": "CREATED"
              },
              {
                  "source": 82,
                  "target": 80,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 84,
                  "target": 83,
                  "name": "CREATED"
              },
              {
                  "source": 85,
                  "target": 83,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 87,
                  "target": 86,
                  "name": "CREATED"
              },
              {
                  "source": 88,
                  "target": 86,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 90,
                  "target": 89,
                  "name": "CREATED"
              },
              {
                  "source": 91,
                  "target": 89,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 93,
                  "target": 92,
                  "name": "CREATED"
              },
              {
                  "source": 94,
                  "target": 92,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 96,
                  "target": 95,
                  "name": "CREATED"
              },
              {
                  "source": 97,
                  "target": 95,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 99,
                  "target": 98,
                  "name": "CREATED"
              },
              {
                  "source": 100,
                  "target": 98,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 102,
                  "target": 101,
                  "name": "CREATED"
              },
              {
                  "source": 103,
                  "target": 101,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 105,
                  "target": 104,
                  "name": "CREATED"
              },
              {
                  "source": 106,
                  "target": 104,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 108,
                  "target": 107,
                  "name": "CREATED"
              },
              {
                  "source": 109,
                  "target": 107,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 111,
                  "target": 110,
                  "name": "CREATED"
              },
              {
                  "source": 112,
                  "target": 110,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 113,
                  "target": 110,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 115,
                  "target": 114,
                  "name": "CREATED"
              },
              {
                  "source": 116,
                  "target": 114,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 118,
                  "target": 117,
                  "name": "CREATED"
              },
              {
                  "source": 119,
                  "target": 117,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 121,
                  "target": 120,
                  "name": "CREATED"
              },
              {
                  "source": 122,
                  "target": 120,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 124,
                  "target": 123,
                  "name": "CREATED"
              },
              {
                  "source": 125,
                  "target": 123,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 127,
                  "target": 126,
                  "name": "CREATED"
              },
              {
                  "source": 128,
                  "target": 126,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 130,
                  "target": 129,
                  "name": "CREATED"
              },
              {
                  "source": 131,
                  "target": 129,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 133,
                  "target": 132,
                  "name": "CREATED"
              },
              {
                  "source": 134,
                  "target": 132,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 136,
                  "target": 135,
                  "name": "CREATED"
              },
              {
                  "source": 137,
                  "target": 135,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 139,
                  "target": 138,
                  "name": "CREATED"
              },
              {
                  "source": 140,
                  "target": 138,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 142,
                  "target": 141,
                  "name": "CREATED"
              },
              {
                  "source": 143,
                  "target": 141,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 145,
                  "target": 144,
                  "name": "CREATED"
              },
              {
                  "source": 146,
                  "target": 144,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 148,
                  "target": 147,
                  "name": "CREATED"
              },
              {
                  "source": 149,
                  "target": 147,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 151,
                  "target": 150,
                  "name": "CREATED"
              },
              {
                  "source": 152,
                  "target": 150,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 154,
                  "target": 153,
                  "name": "CREATED"
              },
              {
                  "source": 155,
                  "target": 153,
                  "name": "RATED:LOVE"
              },
              {
                  "source": 157,
                  "target": 156,
                  "name": "CREATED"
              },
              {
                  "source": 158,
                  "target": 156,
                  "name": "RATED:LOVE"
              }
          ]
      };

      dataset = data 
        ? {
          nodes: data.nodes ? data.nodes.map(n => ({ name: n._node })) : [],
          edges: data.edges
        }
        : { nodes: [], edges: [] };

      $( "svg#graph" ).remove();
      var svg = d3.select("div#graphx_box").append("svg").attr({
          "id": "graph",
          "width": w,
          "height": h
      });

      var force = d3.layout.force()
          .nodes(dataset.nodes)
          .links(dataset.edges)
          .size([w, h])
          .linkDistance([linkDistance])
          .charge([-500])
          .theta(0.1)
          .gravity(0.05)
          .start();



      var edges = svg.selectAll("line")
          .data(dataset.edges)
          .enter()
          .append("line")
          .attr("id", function(d, i) {
              return 'edge' + i
          })
          .attr('marker-end', 'url(#arrowhead)')
          .style("stroke", "#ccc")
          .style("pointer-events", "none");

      var nodes = svg.selectAll("circle")
          .data(dataset.nodes)
          .enter()
          .append("circle")
          .attr({
              "r": 15
          })
          .style("fill", function(d, i) {
              return colors(i);
          })
          .call(force.drag)


      var nodelabels = svg.selectAll(".nodelabel")
          .data(dataset.nodes)
          .enter()
          .append("text")
          .attr({
              "x": function(d) {
                  return d.x;
              },
              "y": function(d) {
                  return d.y;
              },
              "class": "nodelabel",
              "stroke": "black"
          })
          .text(function(d) {
              return d.name;
          });

      var edgepaths = svg.selectAll(".edgepath")
          .data(dataset.edges)
          .enter()
          .append('path')
          .attr({
              'd': function(d) {
                  return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y
              },
              'class': 'edgepath',
              'fill-opacity': 0,
              'stroke-opacity': 0,
              'fill': 'blue',
              'stroke': 'red',
              'id': function(d, i) {
                  return 'edgepath' + i
              }
          })
          .style("pointer-events", "none");

      var edgelabels = svg.selectAll(".edgelabel")
          .data(dataset.edges)
          .enter()
          .append('text')
          .style("pointer-events", "none")
          .attr({
              'class': 'edgelabel',
              'id': function(d, i) {
                  return 'edgelabel' + i
              },
              'dx': 80,
              'dy': 0,
              'font-size': 10,
              'fill': '#aaa'
          });

      edgelabels.append('textPath')
          .attr('xlink:href', function(edge, i) {
              return '#edgepath' + i
          })
          .style("pointer-events", "none")
          .text(function(edge, i) {
              return edge.name
          });


      svg.append('defs').append('marker')
          .attr({
              'id': 'arrowhead',
              'viewBox': '-0 -5 10 10',
              'refX': 25,
              'refY': 0,
              //'markerUnits':'strokeWidth',
              'orient': 'auto',
              'markerWidth': 10,
              'markerHeight': 10,
              'xoverflow': 'visible'
          })
          .append('svg:path')
          .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
          .attr('fill', '#ccc')
          .attr('stroke', '#ccc');


      force.on("tick", function() {
        edges.attr({
            "x1": function(d) {
                return d.source.x;
            },
            "y1": function(d) {
                return d.source.y;
            },
            "x2": function(d) {
                return d.target.x;
            },
            "y2": function(d) {
                return d.target.y;
            }
        });

        nodes.attr({
            "cx": function(d) {
                return d.x;
            },
            "cy": function(d) {
                return d.y;
            }
        });

        nodelabels.attr("x", function(d) {
                return d.x;
            })
            .attr("y", function(d) {
                return d.y;
            });

        edgepaths.attr('d', function(d) {
            var path = 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
            //console.log(d)
            return path
        });

        edgelabels.attr('transform', function(d, i) {
            if (d.target.x < d.source.x) {
                bbox = this.getBBox();
                rx = bbox.x + bbox.width / 2;
                ry = bbox.y + bbox.height / 2;
                return 'rotate(180 ' + rx + ' ' + ry + ')';
            } else {
                return 'rotate(0)';
            }
        });
      });
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////

    // Collect the URL parameters
    var parameters = {};
    window.location.search.substr(1).split('&').forEach(function (entry) {
      var eq = entry.indexOf('=');
      if (eq >= 0) {
        parameters[decodeURIComponent(entry.slice(0, eq))] =
          decodeURIComponent(entry.slice(eq + 1));
      }
    });

    // Produce a Location query string from a parameter object.
    function locationQuery(params) {
      return '?' + Object.keys(params).map(function (key) {
        return encodeURIComponent(key) + '=' +
          encodeURIComponent(params[key]);
      }).join('&');
    }

    // Derive a fetch URL from the current URL, sans the GraphQL parameters.
    var graphqlParamNames = {
      query: true,
      variables: true,
      operationName: true
    };

    var otherParams = {};
    for (var k in parameters) {
      if (parameters.hasOwnProperty(k) && graphqlParamNames[k] !== true) {
        otherParams[k] = parameters[k];
      }
    }
    var fetchURL = locationQuery(otherParams);
    // Defines a GraphQL fetcher using the fetch API.
    function graphQLFetcher(graphQLParams) {
      return fetch(fetchURL, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(graphQLParams),
        credentials: 'include',
      }).then(function (response) {
        return response.text();
      }).then(function (responseBody) {
        try {
          /////////////////////////////////////////////////////////////////////////////////////////////////////
          /////////////////////////////////////////////////////////////////////////////////////////////////////
          var resp = JSON.parse(responseBody);
          updateD3Graph(parameters, resp);
          return resp;
          /////////////////////////////////////////////////////////////////////////////////////////////////////
          /////////////////////////////////////////////////////////////////////////////////////////////////////
        } catch (error) {
          console.log(error);
          return responseBody;
        }
      });
    }
    // When the query and variables string is edited, update the URL bar so
    // that it can be easily shared.
    function onEditQuery(newQuery) {
      parameters.query = newQuery;
      updateURL();
    }

    function onEditVariables(newVariables) {
      parameters.variables = newVariables;
      updateURL();
    }

    function onEditOperationName(newOperationName) {
      parameters.operationName = newOperationName;
      updateURL();
    }

    function updateURL() {
      history.replaceState(null, null, locationQuery(parameters));
    }

    // Render <GraphiQL /> into the body.
    ReactDOM.render(
      React.createElement(GraphiQL, {
        fetcher: graphQLFetcher,
        onEditQuery: onEditQuery,
        onEditVariables: onEditVariables,
        onEditOperationName: onEditOperationName,
        query: ${safeSerialize(queryString)},
        response: ${safeSerialize(resultString)},
        variables: ${safeSerialize(variablesString)},
        operationName: ${safeSerialize(operationName)},
      }),
      //document.body
      ////////////////////////////////////////////////////////////////////////////////////////////////
      document.getElementById('graphiql_container')
    );
  </script>
  <!-- ////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////// -->
  <script>
    $( document ).ready(function() {
        $( ".toolbar" ).after('<div id="graphx-btn" class="toolbar"><a class="toolbar-button" title="Prettify Query">Graph X</a></div>');
        // Get the modal
        var modal = document.getElementById('myModal');

        // Get the button that opens the modal
        var btn = document.getElementById("graphx-btn");

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks on the button, open the modal 
        btn.onclick = function() {
            modal.style.display = "block";
        }

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    });
  </script>
  <!-- ////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////// -->
</body>
</html>`
}
