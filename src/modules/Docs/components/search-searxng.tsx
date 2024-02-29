import { CodeHighlight, CodeHighlightTabs } from "@mantine/code-highlight";
import {
  Anchor,
  Blockquote,
  Code,
  Container,
  Image,
  List,
  Paper,
  Text,
} from "@mantine/core";
import { IconFile } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import React, { useState } from "react";
import WikiLink from "./common/WikiLink";

const CODE_SYS_UPDATE_DEBIAN = `
apt update && apt upgrade
`;
const CODE_SYS_UPDATE_ARCH = `
pacman -S archlinux-keyring
pacman -Syyu
`;

const CODE_CREATE_USER_DEBIAN = `
useradd -s /bin/bash -d /home/searx -m -G sudo searx
passwd searx
su searx
`;
const CODE_CREATE_USER_ARCH = `
useradd -s /bin/bash -d /home/searx -m -G wheel searx
passwd searx
su searx
`;

const CODE_INSTALL_DEPS_DEBIAN = `
sudo apt install git nginx certbot python3-certbot-nginx
`;
const CODE_INSTALL_DEPS_ARCH = `
sudo pacman -S --needed git base-devel
sudo pacman -S nginx-mainline certbot certbot-nginx
`;

const CODE_CLONE_REPO = `
git clone https://github.com/searxng/searxng searxng && cd searxng
sudo -H ./utils/searxng.sh install all
`;

const CODE_NGINX_SA_DEFAULT = `
server {
  # Load configuration files for the default server block.
  include /etc/nginx/default.d/*.conf;

  # Change this to your domain!
  server_name domain.com;

  # Searx Redirect.
  location / {
      uwsgi_pass unix:///usr/local/searxng/run/socket;

      include uwsgi_params;

      uwsgi_param    HTTP_HOST             $host;
      uwsgi_param    HTTP_CONNECTION       $http_connection;

      # see flaskfix.py
      uwsgi_param    HTTP_X_SCHEME         $scheme;
      # uwsgi_param    HTTP_X_SCRIPT_NAME    /searxng;

      # see limiter.py
      uwsgi_param    HTTP_X_REAL_IP        $remote_addr;
      uwsgi_param    HTTP_X_FORWARDED_FOR  $proxy_add_x_forwarded_for;

      # Set this to avoid CORS error, you can set explicit domain if you want instead of *
      add_header access-control-allow-origin * always;
  }
}
`;

const CODE_NGINX_SA_CLOUDFLARE = `
server {
  # ...

  location / {
      # ...

      # see limiter.py
      # uwsgi_param    HTTP_X_REAL_IP        $remote_addr;
      # uwsgi_param    HTTP_X_FORWARDED_FOR  $proxy_add_x_forwarded_for;
      uwsgi_param    HTTP_X_REAL_IP        $http_cf_connecting_ip;
      uwsgi_param    HTTP_X_FORWARDED_FOR  $http_cf_connecting_ip;
      
      # ...
  }
}
`;

const CODE_SEARXNG_CONFIG = `
# SearXNG settings

use_default_settings: true

general:
  debug: false
  instance_name: "Your name"

search:
  safe_search: 0
  autocomplete: ''
  formats:
    - html
    - json
  suspended_times:
    SearxEngineAccessDenied: 240

server:
  # Is overwritten by $/{SEARXNG_SECRET}
  secret_key: "sercet"
  limiter: false
  image_proxy: true
  # public URL of the instance, to ensure correct inbound links. Is overwritten
  # by $/{SEARXNG_URL}.
  # base_url: http://example.com/location

  redis:
  # URL to connect redis database. Is overwritten by $/{SEARXNG_REDIS_URL}.
  url: unix:///usr/local/searxng-redis/run/redis.sock?db=0

ui:
  static_use_hash: true

# preferences:
#   lock:
#     - autocomplete
#     - method

enabled_plugins:
  - 'Hash plugin'
  - 'Self Informations'
  - 'Tracker URL remover'
  - 'Ahmia blacklist'
  # - 'Hostname replace'  # see hostname_replace configuration below
  # - 'Open Access DOI rewrite'

engines:
#   - name: fdroid
#     disabled: false

`;

const CODE_CERTBOT = `
# Add SSL certificate for your domain
certbot --nginx

# Create a copy of default file in sites-enabled
sudo ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/

# Restart both SearXNG and Nginx
sudo systemctl reload nginx
sudo service uwsgi restart searxng
`;

const WikiSearchSearxng = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Container size="lg" p="xl" pb={100}>
      <Blockquote
        color="blue"
        cite="- https://docs.searxng.org/"
        mt="xl"
        radius="sm"
      >
        SearXNG is a free internet metasearch engine which aggregates results
        from more than 70 search services. Users are neither tracked nor
        profiled. Additionally, SearXNG can be used over Tor for online
        anonymity.
      </Blockquote>

      <Text fz="34" fw={600} mt={50} mb="md">
        Installation guide
      </Text>

      <Text mt="md">
        This guide will show you how to setup a SearXNG instance to be used with
        Khofly Search as it&apos;s front-end, your instance will still be
        perfectly usable on it&apos;s own. Important differences:
      </Text>

      <List>
        <List.Item>
          <Text>
            Khofly utilizes SearXNG
            <WikiLink
              href="https://docs.searxng.org/dev/search_api.html"
              label="/search API"
            />{" "}
            to get the results as JSON so we will need to enable - json as
            output format in settings.yml.
          </Text>
        </List.Item>
        <List.Item>
          <Text>
            Since Khofly Search and SearXNG instance are on different domains we
            will need to add Access-Control-Allow-Origin header in Nginx config
            to avoid CORS error
          </Text>
        </List.Item>
      </List>

      <Text mt="md" mb="xs" size="lg" fw="bold">
        Requirements:
      </Text>

      <List>
        <List.Item>
          <Text>A fully qualified domain name (FQDN)</Text>
        </List.Item>
        <List.Item>
          <Text>Virtual Private Server (VPS) that you are renting</Text>
        </List.Item>
      </List>

      <Text mt="md">
        If you&apos;re the only person using your SearXNG instance a basic 5$
        VPS will do just fine
      </Text>

      <Text mt="md" mb="xs" size="xl" fw="bold">
        Make sure everything is up to date
      </Text>

      <Paper mt="md" withBorder radius="sm" style={{ overflow: "hidden" }}>
        <CodeHighlightTabs
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
          code={[
            {
              fileName: "Debian",
              code: CODE_SYS_UPDATE_DEBIAN,
              language: "bash",
              icon: (
                <Image
                  src="/assets/debian-icon.svg"
                  alt="Debian logo"
                  w={20}
                  h={20}
                />
              ),
            },
            {
              fileName: "Arch",
              code: CODE_SYS_UPDATE_ARCH,
              language: "bash",
              icon: (
                <Image
                  src="/assets/arch-icon.svg"
                  alt="Arch logo"
                  w={20}
                  h={20}
                />
              ),
            },
          ]}
        />
      </Paper>

      <Text mt="md" mb="xs" size="xl" fw="bold">
        Create a new user
      </Text>

      <Paper mt="md" withBorder radius="sm" style={{ overflow: "hidden" }}>
        <CodeHighlightTabs
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
          code={[
            {
              fileName: "Debian",
              code: CODE_CREATE_USER_DEBIAN,
              language: "bash",
              icon: (
                <Image
                  src="/assets/debian-icon.svg"
                  alt="Debian logo"
                  w={20}
                  h={20}
                />
              ),
            },
            {
              fileName: "Arch",
              code: CODE_CREATE_USER_ARCH,
              language: "bash",
              icon: (
                <Image
                  src="/assets/arch-icon.svg"
                  alt="Arch logo"
                  w={20}
                  h={20}
                />
              ),
            },
          ]}
        />
      </Paper>

      <Text mt="md">
        Doing this allows you to isolate all the commands and files when
        installing and configuring SearXNG. It can be especially useful if you
        intend to host the search engine on a VPS with multiple services.
      </Text>

      <Text mt="md" mb="xs" size="xl" fw="bold">
        Install dependencies
      </Text>

      <Paper mt="md" withBorder radius="sm" style={{ overflow: "hidden" }}>
        <CodeHighlightTabs
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
          code={[
            {
              fileName: "Debian",
              code: CODE_INSTALL_DEPS_DEBIAN,
              language: "bash",
              icon: (
                <Image
                  src="/assets/debian-icon.svg"
                  alt="Debian logo"
                  w={20}
                  h={20}
                />
              ),
            },
            {
              fileName: "Arch",
              code: CODE_INSTALL_DEPS_ARCH,
              language: "bash",
              icon: (
                <Image
                  src="/assets/arch-icon.svg"
                  alt="Arch logo"
                  w={20}
                  h={20}
                />
              ),
            },
          ]}
        />
      </Paper>

      <Text mt="md" mb="xs" size="xl" fw="bold">
        Clone and install SearXNG
      </Text>

      <Text mt="md">
        There are three different methods for installing SearXNG ( manual,
        installation script, docker ), all explained at the
        <WikiLink
          href="https://docs.searxng.org/admin/installation.html"
          label="official wiki"
        />
        . Here we will use the installation script which automates the manual
        process. First we need to clone the{" "}
        <WikiLink
          href="https://github.com/searxng/searxng"
          label="SearXNG repository"
        />
        . After that is finished, run the installation script.
      </Text>

      <Paper mt="md" withBorder radius="sm" style={{ overflow: "hidden" }}>
        <CodeHighlightTabs
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
          code={[
            {
              fileName: "Debian",
              code: CODE_CLONE_REPO,
              language: "bash",
              icon: (
                <Image
                  src="/assets/debian-icon.svg"
                  alt="Debian logo"
                  w={20}
                  h={20}
                />
              ),
            },
            {
              fileName: "Arch",
              code: CODE_CLONE_REPO,
              language: "bash",
              icon: (
                <Image
                  src="/assets/arch-icon.svg"
                  alt="Arch logo"
                  w={20}
                  h={20}
                />
              ),
            },
          ]}
        />
      </Paper>

      <Text mt="md">
        Installation process is mostly automatic, but you will be asked to
        confirm everything that SearXNG wants to install.
      </Text>

      <Text mt="md" mb="xs" size="xl" fw="bold">
        Nginx configuration
      </Text>

      <Blockquote
        color="yellow"
        // cite="- https://docs.searxng.org/"
        mt="lg"
        radius="sm"
      >
        On Arch check if sites-available and sites-enable directories exist, if
        not create them ( <Code>mkdir sites-available sites-enabled</Code> ) and
        create the default file inside of /sites-available ({" "}
        <Code>touch default</Code> )
      </Blockquote>

      <Paper mt="md" withBorder radius="sm" style={{ overflow: "hidden" }}>
        <CodeHighlightTabs
          code={[
            {
              fileName: "/etc/nginx/sites-available/default",
              code: CODE_NGINX_SA_DEFAULT,
              language: "nginx",
              icon: <IconFile style={getIconStyle(20)} />,
            },
          ]}
        />
      </Paper>

      <Blockquote
        color="yellow"
        // cite="- https://docs.searxng.org/"
        mt="lg"
        radius="sm"
      >
        If your server is behind a Cloudflare proxy you need to adjust X-Real-IP
        and X-Forwarded-For like this
      </Blockquote>

      <Paper mt="md" withBorder radius="sm" style={{ overflow: "hidden" }}>
        <CodeHighlightTabs
          code={[
            {
              fileName: "/etc/nginx/sites-available/default",
              code: CODE_NGINX_SA_CLOUDFLARE,
              language: "nginx",
              icon: <IconFile style={getIconStyle(20)} />,
            },
          ]}
        />
      </Paper>

      <Text mt="md" mb="xs" size="xl" fw="bold">
        SearXNG configuration
      </Text>

      <Blockquote
        color="green"
        // cite="- https://docs.searxng.org/"
        mt="lg"
        radius="sm"
      >
        Default configuration file for SearXNG is located at
        /etc/searxng/settings.yml ( read more about the different options at the
        <WikiLink
          href="https://docs.searxng.org/admin/settings/settings.html"
          label="official wiki"
        />{" "}
        ), this is an example config and you will want to change the following
        values:
        <List>
          <List.Item>
            general.instance_name - to whatever you want ( optional )
          </List.Item>
          <List.Item>
            search.suspended_times.SearxEngineAccessDenied - 240 is ok, default
            is way too high ( optional )
          </List.Item>

          <List.Item>
            search.formats - make sure the json format is enabled along with
            html if you want to use your instacne as a front-end as well
          </List.Item>
          <List.Item>
            server.secret - make sure to change to a random key ( ex. run{" "}
            <Code>openssl rand -hex 32</Code> )
          </List.Item>
        </List>
      </Blockquote>

      <Paper mt="md" withBorder radius="sm" style={{ overflow: "hidden" }}>
        <CodeHighlightTabs
          code={[
            {
              fileName: "/etc/searxng/settings.yml",
              code: CODE_SEARXNG_CONFIG,
              language: "yaml",
              icon: <IconFile style={getIconStyle(20)} />,
            },
          ]}
        />
      </Paper>

      <Text mt="md" mb="xs" size="xl" fw="bold">
        Finalize installation
      </Text>

      <Paper mt="md" withBorder radius="sm" style={{ overflow: "hidden" }}>
        <CodeHighlightTabs
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
          code={[
            {
              fileName: "Debian",
              code: CODE_CERTBOT,
              language: "bash",
              icon: (
                <Image
                  src="/assets/debian-icon.svg"
                  alt="Debian logo"
                  w={20}
                  h={20}
                />
              ),
            },
            {
              fileName: "Arch",
              code: CODE_CERTBOT,
              language: "bash",
              icon: (
                <Image
                  src="/assets/arch-icon.svg"
                  alt="Arch logo"
                  w={20}
                  h={20}
                />
              ),
            },
          ]}
        />
      </Paper>
    </Container>
  );
};

export default WikiSearchSearxng;
