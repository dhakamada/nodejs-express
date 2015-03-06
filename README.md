# Nodejs
Projeto Nodejs

#Configuração do mongo

- mongo.conf

# fork and run in background
fork = true

# bind to and listen for connections from applications on this address
bind_ip = mongodb-1.example.com.br 

port = 27017

quiet = true

dbpath = /opt/mongodb/data/db

logpath = /var/log/mongodb/mongod.log

logappend = true

journal = true

# Enables periodic logging of CPU utilization and I/O wait
#cpu = true

# Turn on/off security.  Off is currently the default
#noauth = true
#auth = true

# Verbose logging output.
#verbose = true

# Inspect all client data for validity on receipt (useful for
# developing drivers)
#objcheck = true

# Enable db quota management
#quota = true

# Set oplogging level where n is
#   0=off (default)
#   1=W
#   2=R
#   3=both
#   7=W+some reads
#oplog = 0

# Diagnostic/debugging option
#nocursors = true

# Ignore query hints
#nohints = true

# Disable the HTTP interface (Defaults to port+1000).
nohttpinterface = true

# Turns off server-side scripting.  This will result in greatly limited
# functionality
#noscripting = true

# Turns off table scans.  Any query that would do a table scan fails.
#notablescan = false

# Disable data file preallocation.
noprealloc = false

# Specify .ns file size for new databases.
# nssize = <size>

# Accout token for Mongo monitoring server.
#mms-token = <token>

# Server name for Mongo monitoring server.
#mms-name = <server-name>

# Ping interval for Mongo monitoring server.
#mms-interval = <seconds>

# Replication Options

# in replicated mongo databases, specify here whether this is a slave or master
#slave = true
#source = master.example.com
# Slave only: specify a single database to replicate
#only = master.example.com
# or
#master = true
#source = slave.example.com

# Address of a server to pair with.
#pairwith = <server:port>
# Address of arbiter server.
#arbiter = <server:port>
# Automatically resync if slave data is stale
#autoresync
# Custom size for replication operation log.
#oplogSize = <MB>
# Size limit for in-memory storage of op ids.
#opIdMem = <bytes>

# Replication Options
replSet = "test"

-- configurar na máuina primária

rs.add("mongodb-1.example.com.br :27017")
rs.add("mongodb-2.example.com.br :27018")
rs.addArb("mongodb-2.example.com.br:27019")


--configurar a prioridade

cfg = rs.conf()
cfg.members[0].priority = 1
cfg.members[1].priority = 0.6
cfg.members[2].priority = 0.5
rs.reconfig(cfg, {force:true})
