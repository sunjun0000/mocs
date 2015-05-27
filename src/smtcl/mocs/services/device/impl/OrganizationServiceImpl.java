package smtcl.mocs.services.device.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

import org.dreamwork.persistence.GenericServiceSpringImpl;
import org.dreamwork.persistence.Parameter;
import org.dreamwork.persistence.ServiceFactory;
import org.primefaces.model.DefaultTreeNode;
import org.primefaces.model.TreeNode;

import smtcl.mocs.pojos.device.TNodes;
import smtcl.mocs.services.device.IAuthorizeService;
import smtcl.mocs.services.device.IOrganizationService;
import smtcl.mocs.utils.device.StringUtils;


/**
 * ��ѯ���ڵ�
 * @version V1.0
 * @����ʱ�� 2012-12-03
 * @���� liguoqiang
 * @�޸���
 * @�޸�����
 * @�޸�˵��
 */
public class OrganizationServiceImpl extends
		GenericServiceSpringImpl<TNodes, String> implements
		IOrganizationService {
	
	private IAuthorizeService authorizeService = (IAuthorizeService) ServiceFactory.getBean("authorizeService");

	/**
	 * �����û�id ҳ��id ������
	 * @param userid  �û�id       
	 * @param pageid  ҳ��id      
	 * @return TreeNode
	 */
	public TreeNode returnTree(String userid, String pageid) {		
		TreeNode root = null;		
		List list = authorizeService.getAuthorizedNodeTree(userid, pageid);
		if (null != list & list.size() > 0) {
			smtcl.mocs.beans.authority.cache.TreeNode tnodes = (smtcl.mocs.beans.authority.cache.TreeNode) list.get(0);
			root = newNodeChildren(tnodes, root);
		}
		return root;
	}

	/**
	 * �ݹ��㷨
	 * 
	 * @param ttParent �ڵ���
	 * @param parent ����ҳ�����
	 * @return
	 */
	public TreeNode newNodeChildren(smtcl.mocs.beans.authority.cache.TreeNode ttParent,
			TreeNode parent) {
		TreeNode newNode = new DefaultTreeNode(ttParent, parent);
		newNode.setExpanded(true);
		for (smtcl.mocs.beans.authority.cache.TreeNode tt : ttParent.getChildNodes()) {
			// ��֯������ʾ�豸
			if (!tt.getNodeType().equals("13")) {
				newNodeChildren(tt, newNode);
			}
		}
		return newNode;
	}


	/**
	 * ���ݽڵ����ַ��ظýڵ��µ����нڵ�id�������ӽڵ��id
	 * ����װ�� '1','2','3' ������ʽ
	 * @param nodeName �ڵ�
	 * @return
	 */
	public String getAllTNodesId(smtcl.mocs.beans.authority.cache.TreeNode currentNode) {
		List nodeIdList = new ArrayList();// ��ǰ�ڵ�����ӽڵ��id
		getNodesAllId(currentNode, nodeIdList);// �ݹ��ȡǰ�ڵ�id���ӽڵ��id
		String nodeid = StringUtils.returnHqlIN(nodeIdList);
		return nodeid;
	}
	/**
	 * ���ݽڵ����ַ��ظýڵ��µ����нڵ�id�������ӽڵ��id
	 * ����װ�� '1','2','3' ������ʽ
	 * @param nodeName �ڵ�
	 * @return
	 */
	public String getAllTNodesId(TNodes tnodes) {
		List nodeIdList = new ArrayList();// ��ǰ�ڵ�����ӽڵ��id
		getNodesAllId(tnodes, nodeIdList);// �ݹ��ȡǰ�ڵ�id���ӽڵ��id
		String nodeid = StringUtils.returnHqlIN(nodeIdList);
		return nodeid;
	}


	/**
	 * �ݹ��ȡǰ�ڵ�id���ӽڵ��id
	 * @param tnodes �ڵ�
	 * @param nodeIdList �ڵ�id����
	 * @return List
	 */
	public List getNodesAllId(smtcl.mocs.beans.authority.cache.TreeNode tnodes,
			List nodeIdList) {
		nodeIdList.add(tnodes.getNodeId());
		for (smtcl.mocs.beans.authority.cache.TreeNode tt : tnodes.getChildNodes()) {
			getNodesAllId(tt, nodeIdList);
		}
		return nodeIdList;
	}
	public List getNodesAllId(TNodes tnodes,List nodeIdList) {
		nodeIdList.add(tnodes.getNodeId());
		for (TNodes tt : tnodes.getTNodeses()) {
			getNodesAllId(tt, nodeIdList);
		}
		return nodeIdList;
	}

	/**
	 * ���ݵ�ǰ�ڵ�id �������и��ڵ������
	 * @param nodeId �ڵ�id
	 * @return List
	 */
	public String getAllParentName(String nodeId){		
		return authorizeService.getNodeLabel(nodeId);
	}
	
	/**
	 * ����û���ǰѡ��Ľڵ��Ӧ������ҳ��Ȩ��
	 * @param userId �û�id
	 * @param pageId ҳ��id
	 * @param buttonId ��ťid
	 * @param nodeId �ڵ�id
	 * @return boolean
	 */
	@Override
	public boolean checkedClickNodeAuthority(String userId, String pageId, String buttonId, String nodeId) {
		return authorizeService.isAuthorize(userId, pageId, buttonId, nodeId);
	}
	
	/*--------------------------WebService start-----------------------------------*/
	/**
	 * ��ȡ�ڵ��µ������ӽڵ�
	 * @param nodeId �ڵ�id
	 * @param userId �û�id
	 * @return List<Map<String, Object>>
	 */
	@Override
	public List<Map<String, Object>> getAllNodesByParentNodeId(String nodeID,
			String userId) {
		List<Map<String, Object>> listMap = new ArrayList<Map<String, Object>>();
		Collection<Parameter> parameters = new HashSet<Parameter>();
		try {
			// Ȩ�޼��ɺ���õķ���
			List<smtcl.mocs.beans.authority.cache.TreeNode> list = authorizeService.getAuthorizedChildNodes(userId, "mocs.sbgl.page.sbgl",nodeID);
			if (list != null && list.size() > 0) {
				for (smtcl.mocs.beans.authority.cache.TreeNode t : list) {
					if(!t.getNodeType().equals("13")){
						Map<String, Object> nodesMap = new HashMap<String, Object>();
						nodesMap.put("nodeId", t.getNodeId());
						nodesMap.put("name", t.getNodeName());
						nodesMap.put("nodeType", t.getNodeType());
						nodesMap.put("parentId", t.getParentId());
						nodesMap.put("checked", !t.isNocheck());
						nodesMap.put("isParent", t.getParent());
						String sql="select count(*) AS num from t_nodes where p_nodeid='"+t.getNodeId()+"' and nodeClass<>13";
						List<Map<String, Object>> countlist=dao.executeNativeQuery(sql, parameters);
						if(countlist.size()>0){
							Map<String, Object> map=countlist.get(0);
							System.out.println(map.get("num"));
							nodesMap.put("childNodesNum",map.get("num"));
						}else{
							nodesMap.put("childNodesNum",0);
						}
						
						listMap.add(nodesMap);
					}
					
				}
			}
		} catch (NumberFormatException e) {
			e.printStackTrace();
		}
		return listMap;
	}

	/**
	 * ����nodeclass��ȡ�ڵ�
	 * @param nodeClass �ڵ�nodeClass
	 * @return List<Map<String, Object>>
	 */
	@Override
	public List<Map<String, Object>> get_All_Node_By_nodeClass(Collection<Parameter> parameters){
		String hql ="SELECT new Map(" +
				"t.nodeName as nodeName ," +
				//" t.TNodeType.nodeclass as TNodeType ," +
				" t.nodeId as nodeId" +
				") FROM TNodes as t " +
				"where 1=1";
		for (Parameter p : parameters) {
			hql += " AND " + p;
		}
		return dao.executeQuery( hql, parameters);
	}

	
	/**
	 * ��ȡǰ�ڵ�id
	 * @param nodeId �ڵ�id
	 * @return List<String>
	 */
	public List<TNodes> getNodesAllId(String nodeId) {
		String hql="from TNodes" +
				  " where nodeId in("+nodeId+")" +
				  " and nodeClass=12 order by seq" ;
		return dao.executeQuery(hql);
	}
	
	/**
	 * �����û�id ҳ��id ���ؽڵ㼯��
	 * @param userid  �û�id       
	 * @param pageid  ҳ��id      
	 * @return TreeNode
	 */
	public List<TNodes> returnWorkshop(String userid, String pageid) {		
		List<TNodes> rslist =new ArrayList<TNodes>();
		List list = authorizeService.getAuthorizedNodeTree(userid, pageid);
		
		if (null != list & list.size() > 0) {
			smtcl.mocs.beans.authority.cache.TreeNode tnodes = (smtcl.mocs.beans.authority.cache.TreeNode) list.get(0);
			rslist=getNodesAllId(getAllTNodesId(tnodes)); 
		}
		return rslist;
	}
	
	
	
	/**
	 * ���ݽڵ�id ��ȡ�ڵ����
	 * @param Id
	 * @return
	 */
	public List<TNodes> getTNodesById(String Id){
		Collection<Parameter> parameters = new HashSet<Parameter>();
		String hql="from TNodes where id='"+Id+"'";
		return dao.executeQuery(hql, parameters);
	}
}