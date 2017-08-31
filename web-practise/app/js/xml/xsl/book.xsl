<?xml version="1.0" encoding="gb2312"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/TR/WD-xsl">
	<xsl:template match="/">
		<HTML>
			<HEAD><TITLE>书籍订单---------E-shop</TITLE>
				<STYLE>
					.title{font-size:15pt;font-weight:bold;color:blue}
					.name{font-size:15pt;font-weight:bold;color:red}
				</STYLE>
				<xsl:apply-templates />
			</HEAD>
		</HTML>
	</xsl:template>
	<xsl:template match="shoppingcart">
		<BODY>
			<xsl:apply-templates />
		</BODY>
	</xsl:template>
	<xsl:template match="shoppingcart/customer">
		<DIV style="background-color:teal;font-weight:bold;">
			<xsl:value-of select="name" />
		</DIV>
		<DIV>
			<xsl:value-of select="email" />
		</DIV>
		<DIV>
			<xsl:value-of select="address" />
		</DIV>
		<DIV>
			<xsl:value-of select="zipcode" />
		</DIV>
	</xsl:template>
	<xsl:template match="shoppingcart/shoppingItem">
		<TABLE border="1">
			<THEAD>
				<TD><B>编 号</B></TD>
				<TD><B>书 名</B></TD>
				<TD><B>价 格</B></TD>
				<TD><B>出版社</B></TD>
			</THEAD>
			<xsl:for-each select="./item" order-by="itemNo">
				<TR>
					<TD><B><xsl:value-of select="itemNo" /></B></TD>
					<TD><B><xsl:value-of select="itemName" /></B></TD>
					<TD><B><xsl:value-of select="price" /></B></TD>
					<TD><B><xsl:value-of select="publisher" /></B></TD>
				</TR>
			</xsl:for-each>
		</TABLE>
	</xsl:template>
</xsl:stylesheet>