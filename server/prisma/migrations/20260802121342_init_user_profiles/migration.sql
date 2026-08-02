-- CreateTable
CREATE TABLE "user_profiles" (
    "user_id" UUID NOT NULL,
    "goal" VARCHAR(30) NOT NULL,
    "experience" VARCHAR(30) NOT NULL,
    "frequency" VARCHAR(20) NOT NULL,
    "injuries" VARCHAR(30),
    "injury_details" VARCHAR(300),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("user_id")
);
