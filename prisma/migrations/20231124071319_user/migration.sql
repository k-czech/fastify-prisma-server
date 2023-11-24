-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userTypeId" INTEGER NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "vatNumber" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "postlCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "isActive" BOOLEAN DEFAULT true,
    "createdDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedDate" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "UserType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userTypeId_fkey" FOREIGN KEY ("userTypeId") REFERENCES "UserType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
