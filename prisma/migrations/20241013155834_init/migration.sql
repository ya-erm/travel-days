-- CreateTable
CREATE TABLE "User" (
    "uuid" TEXT NOT NULL,
    "email" TEXT,
    "publicKey" TEXT NOT NULL,
    "encryptedKey" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "AccessToken" (
    "value" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "invalidated" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AccessToken_pkey" PRIMARY KEY ("value")
);

-- CreateTable
CREATE TABLE "Journal" (
    "userId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "data" TEXT NOT NULL,
    "encryption" TEXT NOT NULL,

    CONSTRAINT "Journal_pkey" PRIMARY KEY ("userId","order")
);

-- AddForeignKey
ALTER TABLE "AccessToken" ADD CONSTRAINT "AccessToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Journal" ADD CONSTRAINT "Journal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
