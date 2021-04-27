---
title: BlueGenes
---

BlueGenes is a new user interface to InterMine replacing the JSP-based webapp included with the InterMine server. It runs as its own service and utilises the InterMine web service API.

## Running BlueGenes

:::note
This is a guide to running BlueGenes in a production environment. If you wish to simply try it out, [click here](../../system-requirements/software/gradle/index#trying-out-bluegenes) to see how to start it from Gradle.
:::

The recommended way to run BlueGenes in production is by using [Docker](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04#step-1-%E2%80%94-installing-docker). On every release, a prebuilt image is pushed to [dockerhub](https://hub.docker.com/r/intermine/bluegenes/tags). The latest version can be downloaded by doing a pull:

```
docker pull intermine/bluegenes:latest
```

You should define the environment of your InterMine by creating a `bluegenes.env` file.

```
BLUEGENES_DEFAULT_SERVICE_ROOT=https://mymine.org/mymine
BLUEGENES_DEFAULT_MINE_NAME=MyMine
BLUEGENES_DEFAULT_NAMESPACE=mymine
```

These are the essentials. For more configuration options, see [Configuration](#configuration).

You will want to keep your [tools folder](../tool-api/overview#tools-folder-and-config) outside the container, so that your existing tools will be kept when updating BlueGenes. To do this, run `mkdir tools` to create a folder we'll use as a docker bind mount. Then start the docker container with the following command:

```
docker run -p 5000:5000 --env-file bluegenes.env -v "$(pwd)"/tools:/tools -d --restart unless-stopped intermine/bluegenes
```

You should be able to access BlueGenes from [http://localhost:5000](http://localhost:5000). To make it publicly accessible, you can point a reverse proxy to this port, or use a different port on the host (e.g. `-p 80:5000`).

:::tip Essential docker commands

* `docker ps -a` - List all containers
* `docker logs <container>` - Print logs of a container
* `docker stop <container>` - Stop a container
* `docker rm <container>` - Remove a container
* `docker images` - List images available locally

:::

## Configuration

| Environment variable | Description | Default |
| ------ | ----------- | ------- |
| SERVER_PORT | Port to be used by BlueGenes web server | 5000 |
| LOGGING_LEVEL | Minimum level for logging | info |
| GOOGLE_ANALYTICS | Google Analytics tracking ID | nil |
| BLUEGENES_TOOL_PATH | Directory on server where BlueGenes tools are installed | ./tools |
| BLUEGENES_DEFAULT_SERVICE_ROOT | Default InterMine service to run HTTP requests against | https://www.flymine.org/flymine |
| BLUEGENES_DEFAULT_MINE_NAME | Mine name to display for default mine | FlyMine |
| BLUEGENES_DEFAULT_NAMESPACE | Namespace of the default mine | flymine |
| BLUEGENES_ADDITIONAL_MINES | Additional mines managed by this BlueGenes instance [(more info)](#additional-mines) | [] |
| HIDE_REGISTRY_MINES | Disable acquiring and displaying mines from the public InterMine registry | false |

### Additional mines

BlueGenes allows you to quickly switch between mines using a dropdown in the navbar. This will display mines from the [InterMine Registry](http://registry.intermine.org/) (unless `HIDE_REGISTRY_MINES` is set) but you can also specify your own mines to be shown as a distinct group, usually for other mines of your organisation. This allows you to have a **single BlueGenes server work as a front end to multiple mines**, without having to run a separate BlueGenes server for each mine in your organisation.

:::note
Specifying additional mines is also required for [permanent URL resolution](../report-page/permanentURL) and [web pages markup](../markup/index) to work for other mines not defined as the default mine.
:::

`BLUEGENES_ADDITIONAL_MINES` expects a value encoded in [EDN](https://github.com/edn-format/edn). In short, square brackets denote a sequence of values, while curly braces denote key-value pairs for every two elements. Keys in maps are keywords, which start with a colon followed by characters. Comma is treated as whitespace, and whitespace separates elements.

Below is an examples of HumanMine and FlyMine specified as additional mines.

```
BLUEGENES_ADDITIONAL_MINES=[{:root "https://www.humanmine.org/humanmine", :name "HumanMine", :namespace "humanmine"} {:root "https://www.flymine.org/flymine", :name "FlyMine", :namespace "flymine"}]
```

### Resources

You can add new or override existing resources served by BlueGenes by creating a `resources` directory and having docker mount it and added to the Java class path with the following command:

```
docker run -p 5000:5000 --env-file bluegenes.env -v "$(pwd)"/tools:/tools -v "$(pwd)"/resources:/resources -d --restart unless-stopped --entrypoint /usr/bin/java intermine/bluegenes -cp "resources:bluegenes.jar" bluegenes.core
```

The path inside the `resources` directory should match what is [provided in BlueGenes](https://github.com/intermine/bluegenes/tree/dev/resources), meaning everything inside `resources/public` is served from the web server root.
