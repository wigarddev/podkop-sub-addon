include $(TOPDIR)/rules.mk

PKG_NAME:=podkop-sub
PKG_VERSION:=0.1.0
PKG_RELEASE:=1

PKG_LICENSE:=MIT
PKG_MAINTAINER:=wigarddev

include $(INCLUDE_DIR)/package.mk

define Package/podkop-sub
  SECTION:=net
  CATEGORY:=Network
  TITLE:=Subscription loader for podkop
  URL:=https://github.com/wigarddev/podkop-sub-addon
  DEPENDS:=+podkop +curl +jq
  PKGARCH:=all
endef

define Package/podkop-sub/description
  Fetches a subscription URL, decodes the server list and writes it into
  podkop's UCI configuration as a urltest group.
endef

# Nothing to build - the package is plain shell
define Build/Compile
endef

define Package/podkop-sub/conffiles
/etc/config/podkop-sub
endef

define Package/podkop-sub/install
	$(INSTALL_DIR) $(1)/usr/bin $(1)/etc/config
	$(INSTALL_BIN) ./files/usr/bin/podkop-sub $(1)/usr/bin/
	$(INSTALL_DATA) ./files/etc/config/podkop-sub $(1)/etc/config/
	chmod 0600 $(1)/etc/config/podkop-sub
endef

$(eval $(call BuildPackage,podkop-sub))
