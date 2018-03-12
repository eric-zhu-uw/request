const updateActives = {
  drop: 'DROP TRIGGER IF EXISTS updateActives;',
  create: `
  CREATE TRIGGER updateActives
     AFTER INSERT ON LEDGER
     FOR EACH ROW
     BEGIN
       DECLARE x DOUBLE(10,2);
       IF ((NEW.debit_user, NEW.credit_user) IN (
         SELECT owed, ower FROM ACTIVES
       )) THEN
          UPDATE ACTIVES SET ACTIVES.amount = ACTIVES.amount+NEW.amount, updatedAt=CURRENT_TIMESTAMP WHERE NEW.debit_user = owed AND NEW.credit_user = ower;
       ELSEIF ((NEW.debit_user, NEW.credit_user) IN (
         SELECT ower, owed FROM ACTIVES
       )) THEN
          SET x := (SELECT amount FROM ACTIVES WHERE NEW.debit_user = ower AND NEW.credit_user = owed);
          IF(x > NEW.amount) THEN
            UPDATE ACTIVES SET amount = amount-NEW.amount, updatedAt=CURRENT_TIMESTAMP WHERE NEW.debit_user = ower AND NEW.credit_user = owed;
          ELSEIF (NEW.amount = x) THEN
            DELETE FROM ACTIVES WHERE NEW.debit_user = ower AND NEW.credit_user = owed;
          ELSE
            DELETE FROM ACTIVES WHERE NEW.debit_user = ower AND NEW.credit_user = owed;
            INSERT INTO ACTIVES (ower,owed,amount, createdAt, updatedAt) VALUES(NEW.credit_user, NEW.debit_user, NEW.amount - x,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
          END IF;
       ELSE
          INSERT INTO ACTIVES (ower, owed, amount, createdAt, updatedAt) VALUES (NEW.credit_user, NEW.debit_user,NEW.amount,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
       END IF;
    END;
  `,
};

const updateBalance = {
  drop: 'DROP TRIGGER IF EXISTS updateBalance;',
  create: `
  CREATE TRIGGER updateBalance
    AFTER INSERT ON LEDGER
    FOR EACH ROW
    BEGIN
      UPDATE USERS SET balance = USERS.balance+NEW.amount, updatedAt=CURRENT_TIMESTAMP WHERE username=NEW.debit_user;
      UPDATE USERS SET balance = USERS.balance-NEW.amount, updatedAt=CURRENT_TIMESTAMP WHERE username=NEW.credit_user;
    END;
  `,
};

const Triggers = {
  updateActives,
  updateBalance,
};

const FriendStatus = {
  PENDING: 1,
  ACCEPTED: 2,
  BLOCKED: 3,
};

const ModelTypes = {
  FriendStatus,
};

export { Triggers, ModelTypes };
