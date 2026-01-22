---
trigger: manual
---

นี่คือ Prompt ที่อัปเดตใหม่ โดยเปลี่ยนคำว่า "Chat" เป็น **"shadcn/ui"** ตามที่คุณต้องการ และใส่รายละเอียดเจาะจงจาก Feedback ล่าสุด เพื่อให้ antigravity gemini3pro เข้าใจบริบทของ Design System ได้ถูกต้องที่สุดครับ

***

### Updated Prompt for antigravity gemini3pro

**Role:** Senior UX/UI Designer & Frontend Developer (Specialist in shadcn/ui implementation)

**Task:** แก้ไข UI ของระบบให้ถูกต้องตามหลักการของ **shadcn/ui** และ Design System ของแบรนด์ โดยแก้ไขปัญหาเรื่อง Consistency, Spacing และ Color Theme ตาม Feedback ดังนี้:

**1. Main Direction: "shadcn/ui" is the standard.**
*   **Concept:** ให้ยึด Layout, Structure, Spacing, และ Border Radius ตาม Component ของ **shadcn/ui** ทั้งหมด
*   **Action:** ไม่ต้องออกแบบ Layout หรือกำหนดค่าเองใหม่ สิ่งที่ต้องทำคือเอา Component ของ **shadcn/ui** มาวาง แล้วเปลี่ยนแค่ **Theme Color** และ **Font** ให้เป็นของ Brand เราเท่านั้น
*   **Correction:** เลิกพยายามทำดีไซน์ใหม่เองที่ดูเหมือนยุคเก่า (Dreamweaver) ให้กลับไปใช้มาตรฐานของ shadcn ที่มีความ Modern ทันที

**2. Spacing & Alignment (Fix Inconsistency):**
*   **Padding:** แก้ไขระยะเว้น (Padding) ในปุ่มและ Card ให้เท่ากันทั้งซ้าย-ขวา ปัจจุบันเว้นไม่เท่ากันและดูไม่สมดุล (ซ้ายนิดเดียว ขวาเยอะ) ซึ่งผิดหลักการของ shadcn
*   **Alignment:** จัดวาง Element ให้ Center หรือ Align ให้ถูกต้อง ห้ามวางแบบสะเปะสะปะ (ชิดซ้ายที ขวาที)
*   **Consistency:** งานจริง (Production) ต้องตรงกับ
 Storybook เพราะใน Storybook (ที่ดูเหมือน shadcn) ทำไว้สวยแล้ว แต่พอขึ้นงานจริงกลับเบี้ยวและ Padding หาย

**3. Button & Element Styling:**
*   **Button Style:** เลิกใช้ปุ่มทรงโบราณที่ดูเชย ให้ใช้ Style ของ shadcn Button ที่มีความ Modern, มี Padding ที่เหมาะสม และมีความโค้ง (Curve/Radius) ที่ถูกต้องตามมาตรฐาน Library
*   **Pop-up/Dialog:** ปรับดีไซน์ Pop-up ให้มี Border และ Contrast ที่ชัดเจนเหมือน shadcn (ตอนนี้เส้นขอบกลืนกับพื้นหลังเกินไปจนมองไม่เห็นความต่าง)

**4. Color System (Strict Adherence):**
*   **Modern Palette Only:** ห้ามใช้สีนอกเหนือจาก Design System ที่ Approved (Theme Modern/K-Pop style) ห้ามใช้สีโทน "ลูกทุ่ง" หรือสีที่ไม่ได้อยู่ใน Palette
*   **CTA Logic:** ห้ามเอาสี Corporate (เช่น สีน้ำเงินโลโก้) มาถมเป็นปุ่ม Call to Action (CTA) โดยไม่ดูบริบท หรือใช้ Hex Code สุ่ม (เช่น 007AC8) ให้ใช้สีตาม Semantic ของ shadcn (Primary, Secondary, Destructive) ที่ map กับสีแบรนด์เราอย่างถูกต้อง
*   **Contrast:** สี Border ต้องมี Contrast ที่ตัดกับ Background ชัดเจน

**5. Font Note:**
*   ให้ใช้ฟอนต์ตามปัจจุบันไปก่อน (รอ Google Sans Thai แบบไม่มีหัวปล่อยตัวสมบูรณ์ค่อยว่ากันอีกที)

---

**สรุปคำสั่งสั้นๆ:**
"รื้อดีไซน์เก่าที่ดูเชยทิ้ง แล้ว Implement ด้วย **shadcn/ui** Components เป็นหลัก โดยให้คง Layout และ Spacing ของ shadcn ไว้ แล้ว **Override** แค่ค่าสี (Color Token) และ Font ตาม Design System ของเราเท่านั้น ห้าม Custom ระยะเองจนเบี้ยวเหมือนที่ผ่านมา"