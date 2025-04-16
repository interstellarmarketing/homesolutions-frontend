

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";





SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."ad_platform_data" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "platform" "text" NOT NULL,
    "date" "date" NOT NULL,
    "campaign_id" "text" NOT NULL,
    "campaign_name" "text",
    "ad_set_id" "text",
    "ad_set_name" "text",
    "ad_id" "text",
    "ad_name" "text",
    "spend" numeric(10,2) DEFAULT 0 NOT NULL,
    "impressions" integer DEFAULT 0,
    "clicks" integer DEFAULT 0,
    "leads" integer DEFAULT 0,
    "cpl" numeric(10,2),
    "ctr" numeric(10,5),
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."ad_platform_data" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."alert_configurations" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "alert_type" "text" NOT NULL,
    "threshold" integer,
    "email_recipients" "text"[],
    "sms_recipients" "text"[],
    "is_active" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."alert_configurations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."buyer_zip_codes" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "buyer_id" "uuid" NOT NULL,
    "zip_code" "text" NOT NULL,
    "payout_amount" numeric(10,2) NOT NULL,
    "effective_from" timestamp with time zone DEFAULT "now"() NOT NULL,
    "effective_to" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "valid_date_range" CHECK ((("effective_to" IS NULL) OR ("effective_from" < "effective_to")))
);


ALTER TABLE "public"."buyer_zip_codes" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."buyers" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "is_active" boolean DEFAULT true,
    "email" "text",
    "phone" "text",
    "contact_person" "text",
    "integration_type" "text",
    "api_endpoint" "text",
    "api_key" "text"
);


ALTER TABLE "public"."buyers" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."lead_dispositions" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "lead_id" "uuid" NOT NULL,
    "buyer_id" "uuid" NOT NULL,
    "status" "text" NOT NULL,
    "reason" "text",
    "appointment_date" timestamp with time zone,
    "sale_date" timestamp with time zone,
    "sale_amount" numeric(10,2),
    "notes" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."lead_dispositions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."leads" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "buyer_id" "uuid",
    "zip_code" "text",
    "first_name" "text",
    "last_name" "text",
    "email" "text",
    "phone" "text",
    "street_address" "text",
    "city" "text",
    "state" "text",
    "is_homeowner" boolean,
    "property_type" "text",
    "utm_source" "text",
    "utm_medium" "text",
    "utm_campaign" "text",
    "utm_term" "text",
    "utm_content" "text",
    "device_category" "text",
    "payout_amount" numeric(10,2),
    "status" "text" DEFAULT 'new'::"text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "source" "text",
    "estimate_type" "text",
    "action" "text",
    "ip_address" "text",
    "credit_score_eligible" boolean,
    "utility_bill_eligible" boolean,
    "fbclid" "text",
    "gclid" "text",
    "wbraid" "text",
    "gbraid" "text",
    "ssn" "text",
    "trusted_form_cert_url" "text",
    "trusted_form_ping_url" "text",
    "posthog_person_id" "text" NOT NULL,
    "fbc" "text",
    "fbp" "text",
    "user_agent" "text",
    "outbound_api_request_url" "text",
    "outbound_api_response_status" "text",
    "outbound_api_request_body" "jsonb",
    "outbound_api_response_body" "jsonb",
    "outbound_api_response_status_code" smallint,
    "outbound_api_response_message" "text",
    "outbound_api_response_error_message" "text",
    "estimate_options" "jsonb"
);


ALTER TABLE "public"."leads" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."offline_conversions" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "lead_id" "uuid" NOT NULL,
    "platform" "text" NOT NULL,
    "conversion_type" "text" NOT NULL,
    "conversion_date" timestamp with time zone NOT NULL,
    "sent_at" timestamp with time zone,
    "status" "text",
    "error_message" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."offline_conversions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."zip_code_populations" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "zip_code" "text" NOT NULL,
    "population" integer,
    "city" "text",
    "state" "text",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."zip_code_populations" OWNER TO "postgres";


ALTER TABLE ONLY "public"."ad_platform_data"
    ADD CONSTRAINT "ad_platform_data_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."ad_platform_data"
    ADD CONSTRAINT "ad_platform_data_platform_date_campaign_id_ad_set_id_ad_id_key" UNIQUE ("platform", "date", "campaign_id", "ad_set_id", "ad_id");



ALTER TABLE ONLY "public"."alert_configurations"
    ADD CONSTRAINT "alert_configurations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."buyer_zip_codes"
    ADD CONSTRAINT "buyer_zip_codes_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."buyers"
    ADD CONSTRAINT "buyers_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."lead_dispositions"
    ADD CONSTRAINT "lead_dispositions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."leads"
    ADD CONSTRAINT "leads_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."leads"
    ADD CONSTRAINT "leads_posthog_person_id_key" UNIQUE ("posthog_person_id");



ALTER TABLE ONLY "public"."offline_conversions"
    ADD CONSTRAINT "offline_conversions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."zip_code_populations"
    ADD CONSTRAINT "zip_code_populations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."zip_code_populations"
    ADD CONSTRAINT "zip_code_populations_zip_code_key" UNIQUE ("zip_code");



CREATE INDEX "idx_ad_platform_data_date" ON "public"."ad_platform_data" USING "btree" ("date");



CREATE INDEX "idx_buyer_zip_codes_active" ON "public"."buyer_zip_codes" USING "btree" ("buyer_id", "zip_code") WHERE ("effective_to" IS NULL);



CREATE INDEX "idx_lead_dispositions_lead_id" ON "public"."lead_dispositions" USING "btree" ("lead_id");



CREATE INDEX "idx_lead_dispositions_status" ON "public"."lead_dispositions" USING "btree" ("status");



CREATE INDEX "idx_leads_buyer_id" ON "public"."leads" USING "btree" ("buyer_id");



CREATE INDEX "idx_leads_created_at" ON "public"."leads" USING "btree" ("created_at");



CREATE INDEX "idx_leads_status" ON "public"."leads" USING "btree" ("status");



CREATE INDEX "idx_leads_zip_code" ON "public"."leads" USING "btree" ("zip_code");



ALTER TABLE ONLY "public"."buyer_zip_codes"
    ADD CONSTRAINT "buyer_zip_codes_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "public"."buyers"("id");



ALTER TABLE ONLY "public"."lead_dispositions"
    ADD CONSTRAINT "lead_dispositions_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "public"."buyers"("id");



ALTER TABLE ONLY "public"."lead_dispositions"
    ADD CONSTRAINT "lead_dispositions_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id");



ALTER TABLE ONLY "public"."leads"
    ADD CONSTRAINT "leads_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "public"."buyers"("id");



ALTER TABLE ONLY "public"."offline_conversions"
    ADD CONSTRAINT "offline_conversions_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id");





ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";



































































































































































































GRANT ALL ON TABLE "public"."ad_platform_data" TO "anon";
GRANT ALL ON TABLE "public"."ad_platform_data" TO "authenticated";
GRANT ALL ON TABLE "public"."ad_platform_data" TO "service_role";



GRANT ALL ON TABLE "public"."alert_configurations" TO "anon";
GRANT ALL ON TABLE "public"."alert_configurations" TO "authenticated";
GRANT ALL ON TABLE "public"."alert_configurations" TO "service_role";



GRANT ALL ON TABLE "public"."buyer_zip_codes" TO "anon";
GRANT ALL ON TABLE "public"."buyer_zip_codes" TO "authenticated";
GRANT ALL ON TABLE "public"."buyer_zip_codes" TO "service_role";



GRANT ALL ON TABLE "public"."buyers" TO "anon";
GRANT ALL ON TABLE "public"."buyers" TO "authenticated";
GRANT ALL ON TABLE "public"."buyers" TO "service_role";



GRANT ALL ON TABLE "public"."lead_dispositions" TO "anon";
GRANT ALL ON TABLE "public"."lead_dispositions" TO "authenticated";
GRANT ALL ON TABLE "public"."lead_dispositions" TO "service_role";



GRANT ALL ON TABLE "public"."leads" TO "anon";
GRANT ALL ON TABLE "public"."leads" TO "authenticated";
GRANT ALL ON TABLE "public"."leads" TO "service_role";



GRANT ALL ON TABLE "public"."offline_conversions" TO "anon";
GRANT ALL ON TABLE "public"."offline_conversions" TO "authenticated";
GRANT ALL ON TABLE "public"."offline_conversions" TO "service_role";



GRANT ALL ON TABLE "public"."zip_code_populations" TO "anon";
GRANT ALL ON TABLE "public"."zip_code_populations" TO "authenticated";
GRANT ALL ON TABLE "public"."zip_code_populations" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
