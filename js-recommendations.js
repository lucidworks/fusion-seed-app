importClass(org.apache.solr.common.SolrInputDocument);
importClass(org.apache.solr.client.solrj.response.QueryResponse);
importClass(org.apache.solr.client.solrj.SolrQuery);
importClass(org.apache.solr.common.SolrDocumentList);


var orig_q = request.getFirstParam("q");

//try {
  
      var server = solrServerFactory.getSolrServer("staples1_signals_aggr");
      
      var params = new SolrQuery();

      /*
      mm=50%
      &pf=query_t^3&pf=query_t~2^7
      &pf=query_t~0^1
      &fl=id
      &fl=doc_id_s
      &fl=weight_d
      &sort=score+desc,weight_d+desc
      &q=paper
      &qf=query_t
      fq=aggr_type_s:*
      &rows=100
      &defType=edismax
      */
      params.setParam("q",orig_q);
      params.setParam("mm","50%");
      params.setParam("pf","query_t^3","query_t~2^7");
      params.setParam("fl","id","doc_id_s","weight_d");
      params.setParam("sort","score desc,weight_d desc");
      params.setParam("qf","query_t");
      params.setParam("fq","aggr_type_s:*")
      params.setParam("rows","100");
      params.setParam("defType","edismax");
      
      var response = server.query(params);
      var list = response.getResults();

      //build the bq
      var bq = "";

      for (var i=list.size();i++) {
            var doc = list.get(i);
            bq += doc.getFieldValue("doc_id_s")+"^"+doc.getFieldValue("weight_d") + " ";
      }

      request.addParam("bq",bq);

//} catch(e) {
//  logger.error("Error getting recommendations:");
//  logger.error(e);
//}      
