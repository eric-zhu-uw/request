import MySQLdb
import random

class bcolours:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'


def printError(e):
  print bcolours.FAIL + "Error encountered: %s" % e + bcolours.ENDC


class Connection:

  def __init__(self,host='localhost',user='root',passwd='',db='request'):
    try:
      self.conn = MySQLdb.connect(host=host, user=user, passwd=passwd, db=db)
    except MySQLdb.Error, e:
      print bcolours.FAIL + "Error connecting: %s" % e + bcolours.ENDC
      exit(1)

  def __del__(self):
    try:
      self.conn.close()
    except:
      pass

  def describeTable(self,table='actives'):
    try:
      cur = self.conn.cursor()
      cur.execute("describe %s"%table)

      print bcolours.HEADER + "TABLE: %s" % table + bcolours.ENDC
      print [i[0] for i in cur.description]
      for row in cur.fetchall():
        print row
    except MySQLdb.Error, e:
      printError(e)


  def genUsers(self,name='user', n=100):
    try:
      # Don't wanna add the same users
      cur = self.conn.cursor()
      cur.execute("SELECT username from USERS WHERE username like '%s%%' ORDER BY username DESC LIMIT 1" % name)
      users = list(x for i in cur.fetchall() for x in i)
      offset = 0
      if len(users) != 0:
        userid = users[0][len(name):]
        try:
          offset = int(userid)+1
        except:
          pass

      vals = ""
      for i in range(n):
        argList = ['("'+name+str(i+offset)+'"', '"first"', '"last"', '"password"', 'CURRENT_TIMESTAMP', 'CURRENT_TIMESTAMP)']
        vals += ",".join(argList)+","

      # Take off last comma
      vals = vals[:-1]
      cur.execute("INSERT IGNORE INTO USERS (username, firstname,lastname,password,createdAt,updatedAt) VALUES " + vals)
      self.conn.commit()
      print bcolours.OKGREEN + "Successfully inserted %d users" % n + bcolours.ENDC

    except MySQLdb.Error, e:
      printError(e)


  def genRequests(self, n=100):
    try:
      cur = self.conn.cursor()
      cur.execute("SELECT username from USERS LIMIT %d" % (2*n))
      users = list(x for i in cur.fetchall() for x in i)
      if len(users) ==0:
        raise Exception("NO ENTRIES, TRY ADDING USERS FIRST")

      count = 0
      vals = ""
      for i in range(n):
        sender = users[count]
        count = 0 if count + 1 == len(users) else count + 1
        receiver = users[count]
        count = 0 if count + 1 == len(users) else count + 1
        amount = random.randint(1,500)
        tp = 'R' if random.randint(0,2)==0 else 'S'
        argList = ['("'+ sender+'"', '"'+receiver+'"', str(amount), '"'+tp+'"', 'CURRENT_TIMESTAMP', 'CURRENT_TIMESTAMP)']
        vals += ",".join(argList)+","
      vals = vals[:-1]
      cur.execute("INSERT IGNORE INTO REQUESTS (sender, receiver,amount,type,createdAt,updatedAt) VALUES " + vals)
      self.conn.commit()

    except MySQLdb.Error, e:
      printError(e)


  """TODO: Clean this up or integrate it with genRequests"""
  def genTransactions(self, n=100):
    try:
      cur = self.conn.cursor()
      cur.execute("SELECT username from USERS LIMIT %d" % (2*n))
      users = list(x for i in cur.fetchall() for x in i)
      if(len(users) ==0):
        raise Exception("NO ENTRIES, TRY ADDING USERS FIRST")

      count = 0
      req = ""
      ledge = ""
      for i in range(n):
        sender = users[count]
        count = 0 if count + 1 == len(users) else count + 1
        receiver = users[count]
        count = 0 if count + 1 == len(users) else count + 1
        amount = random.randint(1,500)
        tp = 'R' if random.randint(0,1) == 0 else 'S'
        argList = ['("'+ sender+'"', '"'+receiver+'"', str(amount), '"'+tp+'"', 'CURRENT_TIMESTAMP', 'CURRENT_TIMESTAMP)']
        debitUser  = sender if tp == 'R' else receiver
        creditUser = receiver if tp == 'R' else sender

        ledger = ['("'+ debitUser+'"', '"'+creditUser+'"', str(amount),  'CURRENT_TIMESTAMP', 'CURRENT_TIMESTAMP)']
        req += ",".join(argList)+","
        ledge += ",".join(ledger) + ","
      req = req[:-1]
      ledge = ledge[:-1]
      cur.execute("INSERT IGNORE INTO REQUESTS (sender, receiver,amount,type,createdAt,updatedAt) VALUES " + req)
      cur.execute("INSERT IGNORE INTO LEDGER (debit_user, credit_user,amount,createdAt,updatedAt) VALUES " + ledge)
      self.conn.commit()

    except MySQLdb.Error, e:
      printError(e)
