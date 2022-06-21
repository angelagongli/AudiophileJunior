CREATE TABLE dbo.Users (
  Id INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
  AuthUID NVARCHAR(200) UNIQUE NOT NULL,
  AuthDisplayName NVARCHAR(200)
);

CREATE TABLE dbo.Subusers (
  Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
  ParentID INT NOT NULL FOREIGN KEY REFERENCES dbo.Users (Id),
  Name NVARCHAR(200),
  Type TINYINT DEFAULT 0,
  Completion DECIMAL DEFAULT 0
);
