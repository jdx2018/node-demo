
-- 创建用户权限：
create view v_user_schema as 
select 
	a.tenantId,
	a.tenantName,
	b.orgId,
	b.orgName,
	c.userId,
	c.userName,
	e.roleId,
	e.roleName,
	g.rightId,
	g.rightName
FROM
	tenant a 
	join tenant_org b on a.tenantId=b.tenantId 
	join tenant_user c on b.tenantId=c.tenantId and b.orgId=c.orgId
	join tenant_user_role d on c.tenantId=d.tenantId and c.userId=d.userId
	join tenant_role e on d.tenantId=e.tenantId and b.orgId=e.orgId and d.roleId=e.roleId
	join tenant_role_right f on e.tenantId=f.tenantId and e.roleId=f.roleId
	join tenant_right g on f.tenantId=g.tenantId and b.orgId=g.orgId  and f.rightId=g.rightId
	

create view `v_role_right` as
select 
a.roleId,
a.roleName,
c.orgName,
e.*
from 
tenant_role a 
join tenant b on a.tenantId=b.tenantId  
join tenant_org c on a.orgId=c.orgId 
left join tenant_role_right d on a.tenantId=d.tenantId and a.orgId=d.orgId and a.roleId=d.roleId and d.isDelete=0
join tenant_right e on e.tenantId=d.tenantId and e.orgId=d.orgId and e.rightId=d.rightId