import MySQLdb
import argparse
import random

choicesList = ['conn_test', 'gen_nums']
parser = argparse.ArgumentParser(description='Generate some data')
parser.add_argument('cmd', default='conn_test', help='What the script should do', choices=choicesList)
parser.add_argument('-n', type=int , help='number of training steps')
parser.add_argument('unused', nargs='+', help='Irrelevant info ')


def parseEnvFile(fileName='.env'):
  f = open(fileName, "r")
  conf = []
  for line in f:
    if not len(line) == 0:
      conf.append(tuple(map(lambda x: x.strip('\n'), line.split("="))))
  conf = dict(conf)
  return conf['DEV_DB_HOST'], conf['DEV_DB_USER'],conf['DEV_DB_PASS'],conf['DEV_APP_PORT']

def connectionTest(host="localhost",user="root",passwd="",db="request"):
  db = MySQLdb.connect(host=host,
                       user=user, passwd=passwd, db=db)
  cur = db.cursor()
  cur.execute("describe ACTIVES")

  for row in cur.fetchall():
    print row[0] + " " + row[1] + " " + str(row[2])
  db.close()


def genNums(n=100, rand=False):
  r = list(range(n))
  if rand:
    random.shuffle(r)
  for i in r:
    print('user' + str(i))


if __name__ == '__main__':
  host,user,pw,port = parseEnvFile()
  args = parser.parse_args()
  print args

  if args.cmd == 'conn_test':
    connectionTest(host=host,user=user,passwd=pw)
  elif args.cmd == 'gen_nums':
    if args.n is None:
      genNums()
    else:
      genNums(args.n)
