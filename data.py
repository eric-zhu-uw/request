import argparse

import db

""" TODO: more control over generation """
choicesList = ['desc_table', 'gen_users', 'gen_requests', 'gen_transactions']
parser = argparse.ArgumentParser(description='Generate some data')
parser.add_argument('cmd', default='conn_test', help='What the script should do', choices=choicesList)
parser.add_argument('-n', '--number', type=int, default=100 , help='Number of things to add')
parser.add_argument('--name' , default='user',nargs = '?',help='Default name that users will have')
parser.add_argument('--table', default='actives', help='What table to describe (used with desc_table)')
parser.add_argument('unused', nargs='*', help='Irrelevant info ')


def parseEnvFile(fileName='.env'):
  f = open(fileName, "r")
  conf = []
  for line in f:
    if not len(line) == 0:
      conf.append(tuple(map(lambda x: x.strip('\n'), line.split("="))))
  conf = dict(conf)
  return conf['DEV_DB_HOST'], conf['DEV_DB_USER'],conf['DEV_DB_PASS'],conf['DEV_APP_PORT']


if __name__ == '__main__':
  host,user,pw,port = parseEnvFile()
  args = parser.parse_args()
  database = db.Connection(host=host,user=user,passwd=pw)

  if args.cmd == choicesList[0]: # desc_table
    database.describeTable(args.table)
  elif args.cmd == choicesList[1]: # gen_users
    database.genUsers(n=args.number, name=args.name)
  elif args.cmd == choicesList[2]: # gen_requests
    database.genRequests(args.number)
  elif args.cmd == choicesList[3]: # gen_transactions
    database.genTransactions(args.number)
